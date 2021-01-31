# Thomas

## Status

## Deprecated

The Home Assistant dashboard and integrations have evolved so much in the last year that I no long feel it worth my while keeping this going when I can just
use that.

It was fun, I learnt alot, but I'm not using it anymore.

## Running

Assuming `yarn`. Replace with `npm` where necessary:

```
git clone git@github.com:jamesmacfie/thomas.git
```

```
cd thomas && yarn install
```

```
yarn start
```

## What is this?

Thomas is a home dashboard system for wall mounted tablets for displaying almost whatever you want. It’s designed to be useful, extendable, and look like something you’d be proud to have on your wall.

## Why build it?

There are other projects like this that exist that you could get to do the same thing as Thomas. However none of these worked in a way that I could be certain would be useful for both myself (the geek in the family), but also for other members of the household. Some of these systems were too complex to set up and modify, some were overly verbose in what they displayed by default, some couldn’t be extended easily, and many were tied to a single source of data. If I want a dashboard system to work for my family then it couldn’t do any of these things.

Many systems create the one dashboard with many views. I was after a system that could sustain many dashboards (for many tablets) with many views. These would live in different parts of the house and all display information most useful for the activities in that particular location. A single dashboard with multiple pages/views is not the same thing.

Plus most of them looked like garbage. If it’s going to be on your wall then at the very least it has to be look nice.

## First principles

### 1. It has to be useful for everyone in the house

If dashboards are to live on the walls of your house, they have to be immediately useful to _everyone_. A home dashboard is only as good as the amount of use it gets. So it makes sense to make it useful to as many household members as possible.

### 2. Overview by a glance, detail by intent

A single glance at a dashboard should give you an overview of what’s going on. Only if you want detail should you need to intentionally stop and look closer.

### 3 .Sensible defaults

If a system is deliberately extendable, where does the core stop and the extensions start? A home dashboard system should include as many extensions as possible by default to provide the greatest potential use. It has to do this while keeping in line with principle number 1.

### 4. Extensible at it’s core

The core of a the dashboard system should be small with the bulk of the functionality coming from extensions or integrations with other systems.

## Here’s some mockups

Note: these are mockups (the [Sketch file](https://github.com/jamesmacfie/thomas/blob/master/Mockup.sketch) is in the repo). Not all of the functionality below has been build yet.

### Kitchen

![Thomas - Kitchen](https://raw.githubusercontent.com/jamesmacfie/thomas/master/public/github/kitchen.png)

### Office

![Thomas - Office](https://raw.githubusercontent.com/jamesmacfie/thomas/master/public/github/office.png)

### Lounge

![Thomas - Lounge](https://raw.githubusercontent.com/jamesmacfie/thomas/master/public/github/lounge.png)

### Lounge - weather view

![Thomas - Lounge weather](https://raw.githubusercontent.com/jamesmacfie/thomas/master/public/github/lounge-w.png)

### Lounge - traffic view

![Thomas - Lounge traffic](https://raw.githubusercontent.com/jamesmacfie/thomas/master/public/github/lounge-t.png)

## Current integrations

### Dark Sky

Integration status: works
Widget status: Limited

### Home Assistant

Integration status: works
Widget status: Limited

### Iframe

Integration status: works
Widget status: Moderate

### Custom JSX

Integration status: kinda works
Widget status: Moderate, yet buggy

### Spotify

Integration status: poc
Widget status: nil

### Google Calendar

Integration status: works until refresh. Needs further documentation
Widget status: Limited

## Future integrations

Oh there’s too many, I can’t list them.
