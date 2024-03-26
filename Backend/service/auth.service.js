const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require('nodemailer');

const UserSevice = require('./user.service');
const service = new UserSevice();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    console.log('hola');
    const token = jwt.sign(payload, config.jwtSecret);
    delete user.dataValues.recoveryToken;
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecretRecovey, {
      expiresIn: '15min',
    });
    const link = `http://myfrontned.com/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.smtpAccount,
      to: `${user.email}`,
      subject: 'Email para la recuperción de la contraseña',
      html: `<p>
              <b>Ingresa al siguente link para recuperar la contraseña</b>
            </p>
            <p>
              <b>${link}</b>
            </p>`,
    };
    const response = await this.sendEmail(mail);
    return response;
  }

  async sendEmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.smtpAccount,
        pass: config.smtpPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }

  async changePasword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecretRecovey);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: newPassword,
      });
      return { message: 'password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;
