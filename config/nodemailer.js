import nodemailer from 'nodemailer';
export function createTransport(host,port,user,pass){
    var transport = nodemailer.createTransport({
        host,
        port,
        auth: {
          user,
          pass
        }
      });

      return transport
}