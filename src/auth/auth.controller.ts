import { Body, Controller, Get, HttpCode, Post, Response } from '@nestjs/common';
import { LoginDto, LoginOutputDto } from './dtos/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() req: LoginDto, @Response() res) {
    try {
      const authInfos = await this.authService.login(req);
      return res.json({
        data: authInfos,
        message: 'Login realizado com sucesso!',
      });
    } catch (e) {
      return res.status(400).json({
        data: {},
        message: e.message,
      });
    }
  }
}
