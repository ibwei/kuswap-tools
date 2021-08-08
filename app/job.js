const EventEmiter = require('events');

class Job {
  emitter = new EventEmiter();
  timer = null;
  status = 0; //  0 未开始，1：完成，2:处理中，3：失败

  constructor(
    name,
    condition,
    steps = [],
    loop = false,
    interval = 1000 * 60 * 10
  ) {
    this.name = name;
    this.condition = condition;
    this.steps = steps; // [{operate:Promise<any>,status:0,1,2
    this.rawSteps = steps;
    this.loop = loop;
    this.interval = interval;

    this.init(steps);
  }

  init(steps) {
    this.generateSteps(steps);
    this.initEmitter();
  }

  generateSteps = (steps) => {
    this.steps = steps.map((fn) => {
      return { task: fn, status: 0 };
    });
  };

  initEmitter = () => {
    console.log(`Job ${this.name}: emitter init success `);
    this.emitter.on('runJob', this.run);
  };

  initWatch() {
    console.log(`watcher init success `);
    this.timer = setInterval(this.checkCondition, this.interval);
  }

  start() {
    this.initWatch();
  }

  checkCondition = async () => {
    if (this.status === 1 && this.loop === false && this.timer) {
      clearInterval(this.timer);
    } else {
      if (this.status === 0) {
        console.log(this.condition, typeof this.condition);
        const run =
          typeof this.condition === 'boolean'
            ? this.condition
            : await this.condition();
        if (run) {
          this.emitter.emit('runJob');
        }
      }
    }
  };

  resetSteps() {
    this.steps = this.steps.map((fn) => {
      return { task: fn, status: 0 };
    });
  }

  run = () => {
    console.log(`Job ${this.name} - start run ...`);
    this.status = 2; // update job status

    try {
      console.log(this, this.steps);
      this.steps.forEach(async (step, index) => {
        console.log(`Job ${this.name} - Task  ${index + 1} start run ...`);
        this.steps[index].status = 2;
        try {
          const res = await step.task();
          if (res) {
            this.steps[index].status = 1;
          } else {
            this.steps[index].status = 2;
          }
        } catch (e) {
          this.steps[index].status = 3;
          console.log(
            `Job ${this.name} - Task  ${index + 1} excute failed:${e}`
          );
          throw new Error('break step task...');
        }
        console.log(`Job ${this.name} - Task  ${index + 1}  excute success`);
      });

      if (!this.loop) {
        this.status = 1;
        this.emitter.off('runJob', this.run);
      } else {
        this.status = 0;
      }
    } catch (e) {
      console.log(e);
      console.log('Job end...');
    }
  };
}

module.exports = Job;
