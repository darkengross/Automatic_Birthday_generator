# Automatic_Birthday_generator
A node script that automatic sends birthday wish email.

This script will fetch data such as email and date of birth from the mongo database. It will then compare the date and month to the current date and month.
Based on the if condition it will send birthday wishes every date at 9:00AM(this time can be changed).

To set up this project carefully follow these steps

1. Run script 
    npm install 
    in the local directory. This will create node_modules folder in the project dir and install all the required dependencies.

2. Make a .env file in the project directory.
        Here we will store sensetive information like sender's email id and sender's email password

#Important step DONT MISS!!
3. Since we are using google smtp server, to send emails and use the services we will need to enable two step authentication. For that
    -> Go to your gmail account then go to security
    -> Enable Two step verification. 
       https://support.google.com/accounts/answer/185839?hl=en&co=GENIE.Platform%3DAndroid  reference this link for 2-step verification
    ->Search app passwords
    ->make a new app called smtpapp and generate automatic password
    ->use this generated password as the User_password in .env file 
  
4. Now run the script by typing
    node index.js 
   in the command line
   
NOTE: We use following packages 

i) nodemailer -> this is used to create a email object and transport/ send it to the required people from the sender.For further info visit https://nodemailer.com/

ii) moongose -> As our ODM library

iii) node-cron -> This package is used to run script every morning at 9:00AM. Read more at https://www.npmjs.com/package/node-cron

     
