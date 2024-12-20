import axios from '@axios';
import { AUTH_CODE, SUCCESS_CODE } from '@config';
import { message } from 'antd';

/**
 * 退出登录
 * @returns
 */
export const logoutService = async (): Promise<boolean> => {
  let context = false;

  try {
    const result = await axios.get<IResult>(`/user/logout?msg=false`);
    let msg = result?.data?.message;
    const code = result?.data?.code;

    if (code === AUTH_CODE) {
      context = true;
      msg = '退出登录成功';
    } else {
      context = code === SUCCESS_CODE;
    }

    if (msg) {
      if (context) {
        message.success(msg);
      } else {
        message.error(msg);
      }
    }
  } catch (error) {}

  return context;
};
