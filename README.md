# Two-City-Comparison-Tool

The purpose of any project is to collaborate with a group of peers to create an application that solves a real-world problem. In this project, our group members were tasked with creating a real-world front-end application that we will be showcasing to potential employers. In order to meet the project requirements:
* styling was made through the CSS Framework Materialize
* the project is deployed to GitHub Pages
* the web application accepts and responds to user input
* Google Maps, CovidActNow, OpenWeather APIs were used
* modals were implemented to serve as an error message
* client-side storage was made to save the city in the search input

## User Story

```
AS A software developer looking for a job in various cities
I WANT to be able to compare data of two cities on one website
SO THAT I can make an educated decision regarding my job search
```

## Acceptance Criteria

```
GIVEN a comparison tool with two city inputs and checkboxes for select data
WHEN I specify certain cities and checkboxes and click submit
THEN I am presented with data that corresponds to the input
WHEN I type into the input field
THEN I am shown recommended city searches
WHEN no checkboxes are clicked
THEN a modal is displayed on the screen prompting the user to select one or more checkboxes
WHEN I search while the Map checkbox is clicked
THEN I am presented with an interactive map of the city with a pin at the center
WHEN I search while the COVID checkbox is clicked
THEN I am shown the county, case count, deaths, ICU capacity ratio, positive test ratio, and case density
WHEN I search while the Jobs checkbox is clicked
THEN I am presented with multiple job openings at certain companies with varying languages and pay
WHEN I search while the Weather checkbox is clicked,
THEN I am presented with current weather conditions, min/max temperature, humidity, and wind speed
WHEN the COVID and Job data is not available for the specified city,
THEN an error message is shown on the screen
WHEN I leave a input field blank after the initial search
THEN I continue to see the last searched city data on the page
```

## Presentation Link

[Project #1 Presentation Slides](https://docs.google.com/presentation/d/1i9GAnpjJ5feEp__Zp6oCg5pia-xnEjDgVD0KYEqoqqM/edit?usp=sharing)

## Screenshot

![Two-City Comparison Tool](/assets/images/screenshot.png)

## GitHub Pages Link

[Two-City Comparison Tool](https://pgandhi21.github.io/Two-City-Comparison-Tool/)