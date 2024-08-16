#!/bin/bash
curl --connect-timeout 30 -f http://localhost:8080/health && curl --connect-timeout 30 -f http://localhost:3000/health