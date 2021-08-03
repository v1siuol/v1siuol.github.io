---
title: 'Flask Traditional Deployments: Zero to One &lt;Setup a VPS&gt;'
tags:
  - Python
  - Flask
categories:
  - [Tutorial]
date: 2019-08-02 00:00:00
---

<img src="/Flask-Traditional-Deployments-Zero-to-One-Setup-a-VPS/Flask_Traditional_Deployments_Zero_to_One_Setup_a_VPS_avatar.png">

> The following article will introduce how to set up a **virtual private server**, and some basic **Linux** commands. 

<!-- more -->

## Background 

- A quite developed web project ( For Flask case, `flask run` listens *127.0.0.1:5000* by default, or `flask run --host 0.0.0.0` to listen all public IPs, like *a.b.c.d:5000*. Have fun with this first, then come and play with VPS! )
- This series is a supplement for *Tradition Deployments* in *Chapter 17. Deployment* in *[Flask Web Development, 2nd Edition][url_flask_web_dev]* written by *Miguel Grinberg*. 
- `$ something` refers to commands in bash

## 0. How to Select a Virtual Private Server 

| 地区 | 服务                   | 备注                          |
| ---- | --------------------- | ----------------------------- |
| 国内 | [腾讯云][url_tx_cloud] | 需备案                        |
| 海外 | [AWS][url_aws]         | 国内的 AWS 由北京的光环新网运营 |

以上是些主流的云服务器啦，贵贵的。

I select AWS here since AWS provides a free tier for **one** year. For details, refer to https://aws.amazon.com/free/. 

AWS Free Tier includes 750 hours of [Amazon Elastic Compute Cloud (EC2)](https://aws.amazon.com/ec2/) **Linux** t2.micro instance usage (1 GiB of memory and 32-bit and 64-bit platform support). Saying we can run 1 instance continuously for one month, or 2 instances at the same time continuously for half a month. 

It also includes 30 GB of [Amazon Elastic Block **Storage** (EBS)](https://aws.amazon.com/ebs/) in any combination of General Purpose (SSD) or Magnetic, plus 2 million I/Os (with EBS Magnetic) and 1 GB of snapshot storage. 

## 1. How to Create the Amazon EC2

Official documents: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html

Basic steps:

1. Sign Up for AWS
2. Create an IAM User
3. Create a Key Pair
4. Create a Virtual Private Cloud (VPC)
5. Create a Security Group

My VPC is like this:

1. AMI: Ubuntu Server 16.04 LTS (HVM), SSD Volume Type - ami-5e8bb23b

    Ubuntu Server 16.04 LTS (HVM), EBS General Purpose (SSD) Volume Type. 

2. Instance type: t2.micro (Variable ECUs, 1 vCPUs, 2.5 GHz, Intel Xeon Family, 1 GiB memory, EBS only)

## 2. How to Connect to my VPC

Official documents: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html

Two commands using in my Mac terminal:

1. `$ chmod 400 /path/my-key-pair.pem` 

    This is used to set the permissions of your private key file as read-only. 

    The link to learn more on `chmod` : https://chmodcommand.com/chmod-400/

2. `$ ssh -i /path/my-key-pair.pem user_name@public_dns_name` 

    Default `user_name` is like:

    * For Amazon Linux 2 or the Amazon Linux AMI, the user name is `ec2-user`.
    * For a Centos AMI, the user name is `centos`.
    * For a Debian AMI, the user name is `admin` or `root`.
    * For a Fedora AMI, the user name is `ec2-user` or `fedora`.
    * For a RHEL AMI, the user name is `ec2-user` or `root`.
    * For a SUSE AMI, the user name is `ec2-user` or `root`.
    * For an Ubuntu AMI, the user name is `ubuntu`.
    * Otherwise, if `ec2-user` and `root` don't work, check with the AMI provider.

    `public_dns_name` is like:`ec2-198-51-100-1.compute-1.amazonaws.com` 

3. The updated version of my second command: `$ ssh -o TCPKeepAlive=yes -o ServerAliveInterval=60 -i /path/my-key-pair.pem user_name@public_dns_name` 

    In my practice, I usually encounter if I do nothing in the terminal for like 5 minutes.

    > packet_write_wait: Connection to &lt;ip&gt; port 22: Broken pipe 

    So I update the connection by sending the "HeartBeat" to the server to hold my connection. 

## 3. How to Close my VPC Connection 

`$ logout` : then you will see `Connection to <public_dns_name> closed. ` .

## 4. (Optional) How to transfer files between my PC and EC2

1. Send files from PC to EC2: PC --> EC2

    `$ scp -i /path/my-key-pair.pem /path/SampleFile.txt user_name@public_dns_name:/path`

    `/path` : my suggestion is to use `~` or `/tmp` . If sending to other paths in your EC2, it might say `permission denied` . 

    So after scp the file to `/tmp` , `ssh` to your server and use command `mv /tmp/SamepleFile.txt /path/you_want` .

2. Send files from EC2 to PC: EC2 --> PC

    `$ scp -i /path/my-key-pair.pem user_name@public_dns_name:/path_in_EC2/SampleFile.txt ~/path_on_PC`

Thank you. 

[url_tx_cloud]: https://cloud.tencent.com/
[url_aws]: https://aws.amazon.com/
[url_flask_web_dev]: https://www.oreilly.com/library/view/flask-web-development/9781491991725/
