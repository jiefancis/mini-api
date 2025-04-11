import * as jwt from 'jsonwebtoken';

export const jwtSign = async (payload) => {
  const secret = process.env.JWT_SECRET;

  return await jwt.sign({ ...payload }, secret, { expiresIn: 60 * 60 });
};

export const jwtVerify = async (token) => {
  const secret = process.env.JWT_SECRET;
  return new Promise((resolve) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log('验证失败:', err.message);
        resolve(false);
      } else {
        console.log('验证成功:', decoded);
        resolve(true);
      }
    });
  });
};
