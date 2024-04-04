# ibidem-front

# Forking
- Firts of all, [install GIT](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) on your computer if you don't have it already;
- Go to [Ibidem front-end repository](https://github.com/ibidemgrupo/ibidem-front);
- At the upper right corner of the page click on the **fork** option;
- Choose **fork-ibidem-front** as the name of your fork;
- Go to your github repositories and click on the new **fork-ibidem-front** repository;
- Click on the green **code** button and copy de **HTTPS** url provided;
- Open a new terminal on your computer, it's recommended to open it in your desktop;
```
# create a folder called ibidem if you don't have it already
$ mkdir ibidem

# enter the folder
$ cd ibidem

# clone your fork
$ git clone <the HTTPS url tou copied>

# enter your fork
$ cd fork-ibidem-front

# add a remote to the Ibidem front-end repository
$ git remote add ibidem-front https://github.com/ibidemgrupo/ibidem-front

# check if it worked
$ git remote -v

# fetch the ibidem-front remote, that will allow you to use it's branches later
$ git fetch ibidem-front
```

# Pulling
- If you didn't add a remote before fallow the **Forking** steps above;
- Open a new terminal on your computer and access the **fork-ibidem-front** folder;
- Make sure you are on the main branch of your fork;
- If you don't have the develop branch at your fork, create it;
```
# creating develop
$ git branch develop

# changing to develop
$ git checkout develop

# fetch and merge the ibidem-front remote to your fork
$ git pull ibidem-front develop

# merge it with the branch you need
$ git checkout <branch name>

# merge
$ git merge develop
```

# Pull Request
- Push all your changes of your fork to the main branch of the same;
- Fallow the **Pulling** steps above to merge the remote develop with the main branch of your fork;
- If there are conflicts, solve it;
- Go to [Github](https://github.com) and access your repositories page;
- Click on the **fork-ibidem-front** repository;
- Click on the **contribute** option;
- Click on the **Open Pull Request** button;
- Make sure that the **base** option of the **base repository** is set to **develop** and that the **compare** option of the **head repository** is set to **main**;
- Click on the **Create Pull Request** option;
- Create a comment to describe what you have done;
- Click on the **Create Pull Request** option.
- **ATENTION!**: pass your changes into develop to the main branch of the remote, if and only if everything into the live application is proved to be working;

# Runing the application
- You will need to install [Node](https://nodejs.org/en/) on your computer, install the LTS version;
- Open a new terminal on your computer and access the **fork-ibidem-front** folder;
```
# install dependencies
$ npm install

# run the application in development mode
$ npm run start

# run the application for production
# build the application
$ npm run build:prod

# start the application in production mode
$ npm run start:prod
```

# Deploying
- If no setup is done begin fallowing the [CloudFront documentation](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/getting-started-cloudfront-overview.html);
- Remenber that it is necessary to set a custom error response to the distribution that points to the s3 bucket in wich your files are stored; the custom error response need to redirect 403 error to 200 OK, pointing the file path to /index.html;
- If your domain is registered into [Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html) fallow it's documentation to configure de DNS;
- If the Route 53 is not your DNS provider remember to set your DNS provider with the servers addresses at the [Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html) hosted zone of your application, make your domain point to all of the addresses;
- After configuring everything into AWS, build the application with the fallowing steps;
- Enter the fork-ibidem-front folder and fallow the **Pulling** steps above;
- Make sure that all dependencies have been installed;
- Make sure that the port into the apiUrl at the production environment is the same as the one into the main.ts file from the src folder at fork-ibidem-back project and that the IP of this apiUrl is your AWS Ec2 instance IP;
- Into the fork-ibidem-front folder run:
```
# build the application in production mode, this will generate a dist folder
$ npm run build:prod
```
- Open your bucket list into Aws S3 and choose your subdomain bucket (www.your-domain);
- Delete all files permanently from the bucket, unless the ones in assets/article-api/;
- Choose upload and upload all contents from the dist/ibidem-front/ unless the ones into the assets/ibidem-front/ folder;
- Remenber to edit the objects metadata, setting the cache-control: max-age=2952000,stale-if-error=0 header, unless to index.html;
- Remember to send a invalidation to the cloudfront distribution, to update de edges cache.



# JSON Article specification
## **Header**
```bash
{
    "header": {
        "title": "A Guerra do Tronos",
        "subtitle": "Indicação de Livro",
        "read_time": 6,
        "image": {
            "source": {"link": "/", "title": ""},
            "description": "capa do livro game of thrones",
            "file_name": "gameOfThrones-post.jpeg"
        }
    }  
}
```
- **Title**: A string containing the title of the post, this title is the one that appears into google resuts and [Grupo Ibidem blog](learn.ibidemholding.com/blog).
- **Subtitle**: A string containing the subtitle of the post, it will appear into [Grupo Ibidem blog](learn.ibidemholding.com/blog).
- **Read_time**: A number cointaining the time required to read the entire article, this will appear into the [Article Page](learn.ibidemholding.com/blog/author/post).
- **image**: An object containing the image information (details in the Image topic).

## **Image**
```bash
{
    "image": {
            "source": {"link": "/", "title": ""},
            "description": "capa do livro game of thrones",
            "file_name": "gameOfThrones-post.jpeg"
        }
}
```

- **Source**: An object containg the the url of the image source and the title containg the source name. If the link value is "/" it won't have an url and 'reprodução/internet' will be assigned to the title.
- **Description**: A string containing a small description about the image.
- **file_name**: a string containg the file name of the image uploaded begining from the last "/".
    - **Ex**: "users/desktop/image/image-test.jpeg" will be interpreted as "image-test/jpeg".

## **Content**
```bash
{
    "content": []
}
```
- **Content**: This is an array with all the titles, topics, images, videos, paragraphs and the hole content of the article.
- **h<(number > 1)>**: The h's represents titles, the greater the number fallowing the 'h' the greater the identation of the title and the smaller the letter.
- **p<(number >= 1)>**: The p's represents paragraphs, the greater the number fallowing the 'p', the greater the identation of the paragraph.
- **Image**: An object containing the image information (details in the Image topic).
- **Video**: An object containg the video information (details in the Video topic).

## **Video**
```bash
{
    "video": {
                "link": ""
            }
}
```
- **embeded_link**: A string containing the embeded link of the video, you can embed going to the video on youtube, go to the share button and click on embed then click on de copy button.
