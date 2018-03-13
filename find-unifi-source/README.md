# Find server unifi source

This is a docker file for the a unifi ap source for the project for the [find server v3](https://www.internalpositioning.com)
Based on the work of [Unifi source for find v2](https://github.com/jacobalberty/find-lf-unifi-source)

Environment variables :
-----------------

- UNIFIUSER
- UNIFIPASS
- UNIFIADDR
- FINDURL
- FINDGROUP

Learning :
-----------------

http POST https://cloud.internalpositioning.com/api/v1/settings/passive family=FAMILY device=wifi-60:57:18:3d:b8:14 location="living room"

Stop learning :
-----------------

http POST https://cloud.internalpositioning.com/api/v1/settings/passive family=FAMILY device=wifi-60:57:18:3d:b8:14
