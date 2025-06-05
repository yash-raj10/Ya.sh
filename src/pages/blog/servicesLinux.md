---
layout: ../../layouts/BlogLayout.astro
title: "Services in Linux: How to Configure Your Own App as a Service."
description: Learn what Linux services are, why they matter, how to control them with commands, and how to configure your own Python app as a service.
tags: \["linux", "services", "systemctl", "devops"]
time: 4
featured: true
timestamp: 2024-12-19T09:00:00+00:00
filename: servicesLinux
---

in oneline "**Services are Linux programs that run in the background**" but let's dive into it a little more and find out why it's important, what it does, how can you configure it and what are the commands around it.

In General terms, Services in Linux help you to configure software to run in the background & make sure that they Run all the time automatically when servers are rebooted and as well as follow the right order of startup. when any software that runs as a service in the background is installed they are automatically configured as a **service** on the system.

## Why do we need services?

Services are necessary for various reasons like Continuous operations, Automation, resource management, etc. For example, Services run in the background and operate independently of user interactions. This allows them to provide continuous functionality without any user intervention. Eg:- a web server Software like Apache HTTP can continue to serve web pages to users without needing direct input from users.

##Some Basic Commands related to Services

- To Start a Service:-
  `service <Service name> start` or `systemctl start <Service name>`
- To Stop a Service:-
  `service <Service name> start` or `systemctl stop <Service name>`
- Configure a service to start at startup:-
  `systemctl enable <Service name>`
- Configure a service to not start at startup:-
  `systemctl disable <Service name>`
- Check the Status of Service:-
  `systemctl status <Service name>` ( for ex.)

![A man controlling the Universe with Linux](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u6mojlhjvwbpolsmd7ez.png)
##Configuring your Application as a Service
let's suppose you have an app.py application and you want to configure this as a service & also a service that will automatically start itself when we reboot the system. For this, we have to add a unit file under `/etc/systemd/system` that will have the same name as the application with an extension service, here it will look like `app.service` & in this unit file, we have to define some sections under [] bracket like [Service] and provide directives (ex:- Excstart) to them

```
[Service]
ExcStart = <command used to run the application> #(enough to make app.py a service)

[Install]
WantedBy=multi-user.target #To automatically run when system boots up

```

and that's it you can use app.py as a service Now. some extra directive which is used generally in a .service unit file.

```
[Unit]
Description= python application # Meta data about the application

[Service]
ExexStart=<command used to run the application>
ExexStartPre=<path of application> #dependency which is used before running the app.py
ExexStartPost=<path of application> #dependency which is used after running the app.py
Restart=always #restart the application when it crashes

[Install]
WantedBy=multi-user.target

```

📖 **Read on Dev.to** → [dev.to article](https://dev.to/yashraj10)

✍️ **Also on Hashnode** → [hashnode article](https://yash-raj.hashnode.dev/)
