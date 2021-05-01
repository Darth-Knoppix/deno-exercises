# Testing HTTP server on Deno vs Node.js

Tests run using Apache Bench locally on M1 Mac mini using `ab -n 10000 -c 100 -g out.data http://0.0.0.0:8080/`

## Node HTTP

```
Server Software:        Node-HTTP
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /
Document Length:        36 bytes

Concurrency Level:      100
Time taken for tests:   5.782 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1300000 bytes
HTML transferred:       360000 bytes
Requests per second:    1729.43 [#/sec] (mean)
Time per request:       57.823 [ms] (mean)
Time per request:       0.578 [ms] (mean, across all concurrent requests)
Transfer rate:          219.56 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   42 315.4      1    3022
Processing:     0   16  18.0     13     190
Waiting:        0    9  13.1      7     183
Total:          0   57 316.9     17    3051

Percentage of the requests served within a certain time (ms)
  50%     17
  66%     19
  75%     21
  80%     22
  90%     25
  95%     30
  98%   1004
  99%   3028
 100%   3051 (longest request)
```

## Deno HTTP

```
Server Software:        Deno-HTTP
Server Hostname:        0.0.0.0
Server Port:            8080

Document Path:          /
Document Length:        36 bytes

Concurrency Level:      100
Time taken for tests:   0.444 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      1710000 bytes
HTML transferred:       360000 bytes
Requests per second:    22498.45 [#/sec] (mean)
Time per request:       4.445 [ms] (mean)
Time per request:       0.044 [ms] (mean, across all concurrent requests)
Transfer rate:          3757.07 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.6      0       5
Processing:     1    4   1.2      4      15
Waiting:        1    4   1.2      4      15
Total:          2    4   1.6      4      17

Percentage of the requests served within a certain time (ms)
  50%      4
  66%      4
  75%      4
  80%      4
  90%      6
  95%      7
  98%     11
  99%     12
 100%     17 (longest request)
```

## Results

This wasn't a very scientific test, just curious too see how Deno and Node.js compare for a very basic web server.

Node - 01729.43 requests per second
Deno - 22498.45 requests per second
