import {Controller, Post, UseGuards, Request} from '@nestjs/common';
import {LocalAuthGuard} from "../auth/guards/local-auth.guard";
import {AuthService} from "../auth/services/auth.service";

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
