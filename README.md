# ReactProgress

a progress bar for React. Inspired by YouTube, [nprogress](https://github.com/rstacruz/nprogress).




##Installation

```
npm install
npm start
gulp
```

Add main.css to your project.

```html
<link rel='stylesheet' href='main.css'/>
```

## Usage

```javascript
import React from 'react';
import Progress from './progress/Progress';

var Root = React.createClass({
  render: function() {
    return (
      <Progress
          progress={0.3}
          spinner={true}
          trickle={true}
          trickleRate={0.02}
          trickleSpeed={400}
      />
    );
  }
});
```

### Props

* progress (0.2), the percentage of the progress bar. (0<= progress <=1)
* spinner (true), turn off loading spinner by setting it to false. (default: true)
* trickle (true), turn off the automatic incrementing behavior by setting this to false. (default: true)
* trickleRate (0.02) , how much to increase per trickle (default: 0.02)
* trickleSpeed (400), how often to trickle. (default: 400)

## License

MIT
