// 密钥
export const SECRET_KEY: string = 'chanwaichun';
// 过期时间
export const EXPIRES_IN: string = '24d';
// 白名单
export const WHITE_LIST: string[] = [
  '/api/user/login',
  '/api/thirdParty/chatMessage',
  '/api/user/addOrUpdate',
  '/static/',
  '/api/thirdParty/chat',
  '/api/zitie/getZitieByLevel',
  '/favicon.ico',
];
