import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SuccessMessage } from 'src/common/decorators/success-message.decorator';
import { Public } from 'src/modules/auth/decorators/public.decorator';


@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Public()
  @Get()
  @SuccessMessage('Application is healthy.')
  @ApiOperation({
    summary: 'Check application health',
  })
  @ApiOkResponse({
    description: 'Application is running.',
  })
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}