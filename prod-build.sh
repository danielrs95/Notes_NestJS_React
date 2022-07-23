#!/bin/sh

nohup ./back-build.sh &> back/nohup.out
nohup ./front-build.sh &> back/nohup.out
