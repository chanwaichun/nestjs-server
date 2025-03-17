import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Response } from 'express';
import { CommonResult } from '../util/commonResult';

type ChatApiParams = {
  messages: Array<{
    role: string;
    content: string;
  }>;
};

@Injectable()
export class ThirdPartyService {
  constructor(private readonly httpService: HttpService) {
    this.httpService = httpService;
  }

  // async chatMessage(body: any): Promise<any> {
  //   const url = 'https://ark.cn-beijing.volces.com/api/v3/embeddings'; // 第三方接口地址
  //   try {
  //     // 发起 GET 请求
  //     const response = await lastValueFrom(
  //       this.httpService.post(
  //         url,
  //         {
  //           model: 'doubao-embedding-text-240515',
  //           input: [
  //             {
  //               role: 'system',
  //               content: '你是豆包，是由字节跳动开发的 AI 人工智能助手.',
  //             },
  //             { role: 'user', content: '常见的十字花科植物有哪些？' },
  //           ],
  //         },
  //         {
  //           // Query 参数
  //           headers: {
  //             Authorization: 'Bearer 8cdff6b5-5aa8-4d17-b89c-997db8ad032e',
  //           }, // 头部信息
  //         },
  //       ),
  //     );
  //     console.log(response);
  //     return response.data; // 返回数据
  //   } catch (error) {
  //     console.log(error);
  //     // 处理错误
  //     throw new Error(`Failed to fetch data: ${error.message}`);
  //   }
  // }
  async chatMessage(body: ChatApiParams, res: Response): Promise<any> {
    const url = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'; // 第三方接口地址
    try {
      const data = {
        model: 'deepseek-v3-241226',
        stream: true,
        ...body,
      };
      console.log(data);
      // 发起 GET 请求
      const response = await lastValueFrom(
        this.httpService.post(url, data, {
          // Query 参数
          headers: {
            Authorization: 'Bearer 8cdff6b5-5aa8-4d17-b89c-997db8ad032e',
          },
          responseType: 'stream',
        }),
      );

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      // 监听 AI 响应流数据
      response.data.on('data', (chunk: Buffer) => {
        res.write(chunk.toString()); // SSE 格式
      });

      response.data.on('end', () => {
        res.end();
      });

      response.data.on('error', (err: any) => {
        console.error('Stream error:', err);
        return CommonResult.failed();
      });
    } catch (error) {
      // 处理错误
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
}
