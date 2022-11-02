import {
  onCloseFunction,
  onMessageFunc,
  onStartFunction,
} from '../services/testService';

const config = {
  prefix: '!test',
  commands: {
    onStart: [onStartFunction],
    onClose: [onCloseFunction],
    onMessage: [
      {
        message: 'test',
        function: onMessageFunc,
      },
    ],
  },
};

export default config;
