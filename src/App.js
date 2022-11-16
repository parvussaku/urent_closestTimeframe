import "./styles.css";

const TIME_LENGTH = 8;

const DATA = [
  {
    firstStartTime: "2022-11-19T10:30:00.000Z",
    lastStartTime: "2022-11-19T10:30:00.000Z",
    lastReturnTime: "2022-11-21T14:00:00.000Z",
    returnTimes: [
      {
        start: "2022-11-19T16:00:00.000Z",
        end: "2022-11-19T16:00:00.000Z",
      },
      {
        start: "2022-11-20T10:00:00.000Z",
        end: "2022-11-20T10:00:00.000Z",
      },
      {
        start: "2022-11-20T16:00:00.000Z",
        end: "2022-11-20T16:00:00.000Z",
      },
      {
        start: "2022-11-21T05:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
      {
        start: "2022-11-21T14:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
    ],
  },
  {
    firstStartTime: "2022-11-19T16:30:00.000Z",
    lastStartTime: "2022-11-19T16:30:00.000Z",
    lastReturnTime: "2022-11-21T14:00:00.000Z",
    returnTimes: [
      {
        start: "2022-11-20T10:00:00.000Z",
        end: "2022-11-20T10:00:00.000Z",
      },
      {
        start: "2022-11-20T16:00:00.000Z",
        end: "2022-11-20T16:00:00.000Z",
      },
      {
        start: "2022-11-21T05:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
      {
        start: "2022-11-21T14:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
    ],
  },
  {
    firstStartTime: "2022-11-20T10:30:00.000Z",
    lastStartTime: "2022-11-20T10:30:00.000Z",
    lastReturnTime: "2022-11-21T14:00:00.000Z",
    returnTimes: [
      {
        start: "2022-11-20T16:00:00.000Z",
        end: "2022-11-20T16:00:00.000Z",
      },
      {
        start: "2022-11-21T05:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
      {
        start: "2022-11-21T14:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
    ],
  },
  {
    firstStartTime: "2022-11-20T16:30:00.000Z",
    lastStartTime: "2022-11-20T16:30:00.000Z",
    lastReturnTime: "2022-11-21T14:00:00.000Z",
    returnTimes: [
      {
        start: "2022-11-21T05:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
      {
        start: "2022-11-21T14:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
    ],
  },
  {
    firstStartTime: "2022-11-21T05:00:00.000Z",
    lastStartTime: "2022-11-21T05:00:00.000Z",
    lastReturnTime: "2022-11-21T14:00:00.000Z",
    returnTimes: [
      {
        start: "2022-11-21T05:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
      {
        start: "2022-11-21T14:00:00.000Z",
        end: "2022-11-21T14:00:00.000Z",
      },
    ],
  },
];

export default function App() {
  const closest = (num, arr) => {
    var curr = arr[0];
    var diff = Math.abs(num - curr);
    for (var val = 0; val < arr.length; val++) {
      var newdiff = Math.abs(num - arr[val]);
      if (newdiff < diff) {
        diff = newdiff;
        curr = arr[val];
      }
    }
    return curr;
  };

  const getBestFromObj = (obj) => {
    // make a list of unique times
    var listOfTimes = [];
    if (obj.firstStartTime === obj.lastStartTime) {
      obj.returnTimes.forEach((returnTime) => {
        if (returnTime.start === returnTime.end) {
          listOfTimes.push([obj.firstStartTime, returnTime.start]);
        } else {
          listOfTimes.push([obj.firstStartTime, returnTime.start]);
          listOfTimes.push([obj.firstStartTime, returnTime.end]);
        }
      });
    } else {
      [obj.firstStartTime, obj.lastStartTime].forEach((startTime) => {
        obj.returnTimes.forEach((returnTime) => {
          if (returnTime.start === returnTime.end) {
            listOfTimes.push([startTime, returnTime.start]);
          } else {
            listOfTimes.push([startTime, returnTime.start]);
            listOfTimes.push([startTime, returnTime.end]);
          }
        });
      });
    }
    // convert into list of hours
    var listOfHours = [];
    listOfTimes.forEach((timeArr) => {
      var hours = Math.abs(new Date(timeArr[0]) - new Date(timeArr[1])) / 36e5;
      listOfHours.push(hours);
    });

    var closestHour = closest(TIME_LENGTH, listOfHours);

    const bestTime = {
      startEnd: listOfTimes[listOfHours.indexOf(closestHour)],
      hours: closestHour,
    };

    return bestTime;
  };

  const getBestFromList = () => {
    // get list of best for each object
    const listOfBest = DATA.map((obj) => {
      let best = getBestFromObj(obj);
      return best;
    });

    const listOfHours = listOfBest.map((obj) => {
      return obj.hours;
    });

    var closestHour = closest(TIME_LENGTH, listOfHours);

    const bestTime = {
      startEnd: listOfBest[listOfHours.indexOf(closestHour)],
      hours: closestHour,
    };

    console.log(bestTime);
    console.log(listOfBest);
  };

  return (
    <div className="App">
      <h4>
        Shows array with best objects & best object from that array in console
        by pressin calculate
      </h4>
      <button onClick={() => getBestFromList()}>Calculate</button>
    </div>
  );
}
