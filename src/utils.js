import {adjectives, nouns} from "./words"; 
import dotenv from "dotenv";
import path from "path";
dotenv.config({path:path.resolve(__dirname,".env")});
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () =>{
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`
}

export const sendMail = (email) => {
    const options = {
        auth:{
            api_key:process.env.MAILGUN_API,
            domain:process.env.MAILGUN_DOMAIN
        }
    }
    const nodemailerMailgun = nodemailer.createTransport(mg(options));
    return nodemailerMailgun.sendMail(email, (err,info)=>{
        if(err){
            console.log(`Error: ${err}`)
        }else{
            console.log(`Response:${info}`);
        }
    });
    
}
export const sendSecretMail = (address, secret) => {
    const email ={
        from:"tpgurdl92@gmail.com",
        to:address,
        subject: "Login Secret for Clonegram",
        html:`hello your login secret is <strong>${secret}</strong>`
    }
    return sendMail(email);
}

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);
