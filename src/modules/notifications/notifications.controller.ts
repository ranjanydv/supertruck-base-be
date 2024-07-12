import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { UpdateNotificationTokenDto } from './dto/update-notification-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/is-public.decorator';
import { SendNotificationDto } from './dto/send_notification_dto';

@Public()
@ApiTags('Push Notification')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Put('push/enable/:id')
  @HttpCode(HttpStatus.OK)
  async enablePush(@Body() updateDto: UpdateNotificationTokenDto, @Param('id') userId: number) {
    return await this.notificationsService.acceptPushNotification(+userId, updateDto);
  }

  @Put('push/disable')
  @HttpCode(HttpStatus.OK)
  async disablePush(@Param('id') userId: number, @Body() updateDto: UpdateNotificationTokenDto) {
    return await this.notificationsService.disableNotification(userId, updateDto);
  }

  @Get('push/notifications')
  @HttpCode(HttpStatus.OK)
  async fetchPusNotifications() {
    return await this.notificationsService.getAllNotifications();
  }

  @Post('send/notifications/:userId')
  @HttpCode(HttpStatus.OK)
  async sendPusNotifications(@Param('userId') userId: number, @Body() sentData: SendNotificationDto) {
    return await this.notificationsService.sendPush(userId, sentData);
  }
}
