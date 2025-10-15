---
layout: ../../layouts/BlogLayout.astro
title: "WTH is openFGA and implementing Role-Based Access Control in GO servers."
description: while i have given a task to implement the Role-Based Access Control in the product that I am working on in my internship, i did down a bit. I looked for some open source project which can help me to do this. During that peiod i came accross a project called openFGA, which is an open source Fine-Grained Authorization solution inspired by Google's Zanzibar paper.
tags: ["Golang", "OpenFGA", "Authorization", "RBAC", "Docker"]
time: 8
featured: true
timestamp: 2025-10-15T09:00:00+00:00
filename: openFGA
---

While I have given a task to implement the Role-Based Access Control in the product that I am working on in my internship, I dug a bit. I looked for some open source project that can help me do this. During that period, I came across a project called openFGA, which is an open-source Fine-Grained Authorisation solution inspired by Google's Zanzibar paper, which is currently under CNCF and built by the engineers at Auth0(Okta). I looked at the docs, which instantly got my interest as the implementation was easy and straightforward. OpenFGA divides the whole Role-Based Access thing into a few components and makes it really easy to implement it in any complex project.

So **what really openFGA is?**
OpenFGA is an open source Fine-Grained Authorization solution inspired by Google's Zanzibar paper, and helps you to implement complex Role-Based Access Control Authorization shamelessly. Example - what we have similar in Google Docs, where the owner of a file can give view/edit access to a file/folder with one click.

**Components and how they work?**

- OpenFGA Server: A permission engine that implements the fine-grained authorisation logic
- Authorisation Models: Define the rules and structure for permissions in the system. Consists of definitions, which specify how different objects relate to each other. Used to define roles and relationships (e.g. viewer, owner, editor).
- Relationship Tuples: Relationship tuples are the instances of relationships defined in the authorisation model.(e.g. user:anne, viewer, document:1)
- Stores: The data storage for tuples, which represent relationships between users and objects. Each store contains a specific authorisation model and its associated data.
- Client SDKs: Libraries available for various programming languages to interact with the OpenFGA server.

**How does it work? and Architecture!**
we will take an example of a Go server which has simple auth and the user can create-file(/create-file), view-file (/files) and share-file(/share-file) on respective routes.

- First of all we need to run the openFGA locally, and for that, we will be using Docker Compose. its the easiest way and get work done and set up in one click. (make sure to have already installed)
- Make a `docker-compose.yml` at the root of your Go web server, paste this and run the cmd

```bash
docker compose up -d
```

this will run the openFGA server at port 8080.

```yaml
version: "3.8"

networks:
  openfga:

services:
  postgres:
    image: postgres:17
    container_name: postgres
    networks:
      - openfga
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  migrate:
    depends_on:
      postgres:
        condition: service_healthy
    image: openfga/openfga:latest
    container_name: migrate
    command: migrate
    environment:
      - OPENFGA_DATASTORE_ENGINE=postgres
      - OPENFGA_DATASTORE_URI=postgres://postgres:password@postgres:5432/postgres?sslmode=disable
    networks:
      - openfga

  openfga:
    depends_on:
      migrate:
        condition: service_completed_successfully
    image: openfga/openfga:latest
    container_name: openfga
    environment:
      - OPENFGA_DATASTORE_ENGINE=postgres
      - OPENFGA_DATASTORE_URI=postgres://postgres:password@postgres:5432/postgres?sslmode=disable
      - OPENFGA_LOG_FORMAT=json
    command: run
    networks:
      - openfga
    ports:
      # Needed for the http server
      - "8080:8080"
      # Needed for the grpc server (if used)
      - "8081:8081"
      # Needed for the playground (Do not enable in prod!)
      - "3000:3000"
```

- Now when server is running we need to create the Authorisation Models that Define the rules and structure for permissions in the system. (e.g. viewer, owner, editor) for this Go to http://localhost:3000/playground and create a store and make the models
  ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qgu3a7l2zhr65mpvjxn7.png)
  Here, there are two types, user and file and defined respective relations.

- Now, during the api calls, we will be creating tuples and saving them through the openFGA server while we save the file data into the database. example.
  ![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uw6lwfyzu5snmyr1hqhv.png)

- The architecture of our app will look something like this.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/evkkmfspu0z3el13ie2q.png)

**Code implementation**

- Install the Go client Sdk with

```bash
go get -u github.com/openfga/go-sdk
```

and import it in the file.

- initialise the openFGA client and mongoDB

```go
func init() {
	// initialize MongoDB
	mongoURL := "mongodb+srv://........"
	client, _ := mongo.Connect(options.Client().ApplyURI(mongoURL))
	filesCollection = client.Database("api").Collection("Files")

	// initialize OpenFGA client
	var err error
	fgaClient, err = fgaclient.NewSdkClient(&fgaclient.ClientConfiguration{
		ApiUrl:  "http://localhost:8080",
		StoreId: "01K7J7Y4NTKW4W2RJNG6HRTQC1",
		AuthorizationModelId: "01K7J8F5X3EKXPPZ931M2ZKNW8",
	})
	if err != nil {
		fgaClient = nil
	}
}

```

- The code is using a simple JWT token to sign up and an Auth middleware to protect other routes. and basic struct for file and user struct.

```go
type User struct {
	Username string `json:"username"`
	Email    string `json:"email"`
}

type FileRecord struct {
	ID       string `json:"id" bson:"_id"`
	Filename string `json:"filename" bson:"filename"`
}

func authMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.Next()
			return
		}

		parts := strings.Split(authHeader, "Bearer ")
		if len(parts) != 2 {
			c.Next()
			return
		}

		token, err := jwt.Parse(strings.TrimSpace(parts[1]), func(token *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		if err == nil && token.Valid {
			if claims, ok := token.Claims.(jwt.MapClaims); ok {
				c.Set("user", User{
					Username: claims["username"].(string),
					Email:    claims["email"].(string),
				})
			}
		}

		c.Next()
	}
}

```

- /create-file will store the file in the DB(mongodb), and using the openFGA client, it will create a tuple in the OpenFGA PostgreSQL DB through the openFGA server, with an owner relation to the user with the file.

```go
func createFile(c *gin.Context) {
	userVal, exists := c.Get("user")
	if !exists {
		c.JSON(401, gin.H{"error": "Please login"})
		return
	}

	user := userVal.(User)
	var req struct {
		ID       string `json:"id"` // file id
		Filename string `json:"filename"`
	}
	c.ShouldBindJSON(&req)

	existingFile, _ := getFileRecordById(req.ID)
	if existingFile != nil {
		c.JSON(400, gin.H{"error": "file with id " + req.ID + " already exists!"})
		return
	}

	createFileRecord(FileRecord{ID: req.ID, Filename: req.Filename})

	// Use OpenFGA SDK
	if fgaClient != nil {
		body := fgaclient.ClientWriteRequest{
			Writes: []fgaclient.ClientTupleKey{{
				User:     "user:" + user.Username,
				Relation: "owner",
				Object:   "file:" + req.ID,
			}},
		}

		_, err := fgaClient.Write(context.Background()).Body(body).Execute()
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to set file ownership"})
			return
		}
	}

	c.JSON(201, gin.H{"message": "File created success!"})
}
```

- /files will filter out the IDs of files associated with the user with view access (owner or can_view) and return the files associated with these IDs.

```go
func getFiles(c *gin.Context) {
	userVal, exists := c.Get("user")
	if !exists {
		c.JSON(401, gin.H{"error": "Please login"})
		return
	}

	user := userVal.(User)

	// Use OpenFGA SDK
	if fgaClient != nil {
		body := fgaclient.ClientListObjectsRequest{
			User:     "user:" + user.Username,
			Relation: "can_view",
			Type:     "file",
		}

		allowedFiles, err := fgaClient.ListObjects(context.Background()).Body(body).Execute()
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to get allowed files"})
			return
		}

		// Extract file IDs from objects
		var allowedFileIds []string
		for _, obj := range allowedFiles.Objects {
			parts := strings.Split(obj, ":")
			if len(parts) == 2 {
				allowedFileIds = append(allowedFileIds, parts[1])
			}
		}

		// Only fetch allowed files from database (much more efficient!)
		var allowed []FileRecord
		if len(allowedFileIds) > 0 {
			// Use MongoDB $in operator to fetch only allowed files
			filter := bson.M{"_id": bson.M{"$in": allowedFileIds}}
			cursor, err := filesCollection.Find(context.Background(), filter)
			if err == nil {
				defer cursor.Close(context.Background())
				cursor.All(context.Background(), &allowed)
			}
		}

		c.JSON(200, gin.H{"files": allowed})
	} else {
		// Fallback when OpenFGA not configured
		files, _ := getAllFileRecords()
		c.JSON(200, gin.H{"files": files})
	}
}

```

- /share-file will check if the current user has the "can-edit" file permission. If yes, then a tuple with and viewer relation will be created with the file ID and the user for whom the access is going.

```go
func shareFile(c *gin.Context) {
	userVal, exists := c.Get("user")
	if !exists {
		c.JSON(401, gin.H{"error": "Please login"})
		return
	}

	user := userVal.(User)
	var req struct {
		ID       string `json:"id"` // file id
		Username string `json:"username"` // username to which we need to associate that file
	}
	c.ShouldBindJSON(&req)

	// SECURITY CHECK: Verify the current user can edit access of this file
	if fgaClient != nil {
		// Check if user has permission to edit access (can_edit file acces permission)
		checkBody := fgaclient.ClientCheckRequest{
			User:     "user:" + user.Username,
			Relation: "can_edit",
			Object:   "file:" + req.ID,
		}

		checkResp, err := fgaClient.Check(context.Background()).Body(checkBody).Execute()
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to verify permissions"})
			return
		}

		if checkResp.Allowed == nil || !*checkResp.Allowed {
			c.JSON(403, gin.H{"error": "You don't have permission to edit access for this file"})
			return
		}

		// If authorized, create the viewer relationship
		body := fgaclient.ClientWriteRequest{
			Writes: []fgaclient.ClientTupleKey{{
				User:     "user:" + req.Username,
				Relation: "viewer",
				Object:   "file:" + req.ID,
			}},
		}

		_, err = fgaClient.Write(context.Background()).Body(body).Execute()
		if err != nil {
			c.JSON(500, gin.H{"error": "Failed to share file"})
			return
		}
	}

	c.JSON(200, gin.H{"message": "Access Added"})
}


```

**Conclusion**
Successfully implementing the Role-Based Access Control (RBAC) and doing this manually can quickly get messy as an application grows in complexity. That's where OpenFGA truly shines. it brings structure, scalability, and flexibility to authorisation without forcing you to reinvent the wheel. With just a few API calls, you can define and enforce permissions across users, roles, and resources in a clean way.

`You can access the full code here` ([https://github.com/yash-raj10/Go-openFGA-implementation](https://github.com/yash-raj10/Go-openFGA-implementation))

📖 **Read on Dev.to** → [dev.to article](https://dev.to/yashraj10)

✍️ **Also on Hashnode** → [hashnode article](https://yash-raj.hashnode.dev/)
