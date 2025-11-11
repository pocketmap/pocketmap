# Offline Map

The goal of this project is to create an entirely offline map capability using data from open sources map providers such as [OpenStreetMaps](https://openstreetmaps.org).  The easiest way to host these files is by using the HTTP-friendly pmtiles format from [Protomaps](https://protomaps.com).

## Getting Started
For a map of the entire planet, I chose to get the latest from [Protomaps Builds](https://maps.protomaps.com/builds/):

**WARNING** This file is very large - around 122 GB for the latest!  Make sure you have space on your device.
```bash
wget https://demo-bucket.protomaps.com/v4.pmtiles -o /volume1/docker/tiles/v4.pmtiles
```

[Mapterhorn](https://mapterhorn) provides terrain for the entire planet:

**WARNING** This file is very large - around 540 GB for the latest!  Make sure you have space on your device.
```bash
wget https://download.mapterhorn.com/planet.pmtiles -o /volume1/docker/tiles/planet.pmtiles
```

I'm running this as a docker container on my NAS devices, and I've scheduled weekly downloads of the latest map data.
```bash
docker run -p 8080:80 -v /volume1/docker/tiles:/usr/share/nginx/html/tiles --name offline-maps gcr.io/jmondragon/offline-maps:main
```

## Roadmap:

- [ ] Offline glyphs and fonts
- [ ] Add OpenFreeMap styles with pmtiles
- [ ] Add satellite view in pmtile format
- [ ] Add configurable maps and mapstyles
