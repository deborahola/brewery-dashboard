# Web Development Project 6 - *Brewery Dashboard (Part 2)* 🍺

Submitted by: **Deborah Oladokun**

This web app: **Lets users view, search, filter, and analyze brewery information with rich, interactive visualizations.**

Time spent: **10** hours spent in total

---

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
    * (*Shows full street address, phone number, brewery type, and link to location on Google Maps*)
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset  
    * (*Brewery type distribution*)  
    * (*Website availability*)  
    * (*Top states by number of breweries*)  
    * (*Latitude + Longitude*)

---

## Optional Features

The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
    * (*Filter Tips tooltip suggests helpful filters to try*) 
    * (*Additional 'About' page explaining more*) 
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

---

## Walkthrough GIF

Here's a walkthrough of implemented user stories:

<!-- https://i.imgur.com/dmNIuj9.gif -->
<!-- https://imgur.com/a/wzmN1sL -->
<img src="src/assets/project6_walkthrough.gif" width="600" alt='Walkthrough GIF' />


---


# Web Development Project 5 - *Brewery Dashboard* 🍺

Submitted by: **Deborah Oladokun**

This web app: **Lets users explore breweries across the U.S. using live API data, search, and multiple filters like type, state, and ZIP code. The dashboard shows details about each brewery and includes summary stats.**

Time spent: **6** hours spent in total

---

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
    * (The dashboard displays at least 40 breweries, each in a card layout)
  - The dashboard includes at least two features in each row
    * (Each card includes the name, type, location, and website link if available)
- [x] **`useEffect` React hook and `async`/`await` are used**
  - `useEffect` is used to trigger the API call on initial load
    * (Data is fetched via `fetch()` using `async/await` inside a `useEffect` hook)
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    * (*Total breweries fetched*)
    * (*Percentage with websites*)
    * (*# of Unique cities*)
    * (*Average ZIP code*)
    * (*Most common brewery type*)
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

---

## Optional Features

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
  * (Search, type, state, and ZIP code can all be combined)
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
    * *Text input (search)*
    * *Dropdown (type)*
    * *Checkboxes (state)*
    * *Range slider (ZIP code)*
- [x] The user can enter specific bounds for filter values
  * (ZIP code filter slider dynamically adjusts to max ZIP code in the data)

---

## Additional Features

The following **additional** features are implemented:

* [x] Responsive design for desktop and mobile devices

---

## Walkthrough GIF

Here's a walkthrough of implemented user stories:

<!-- https://i.imgur.com/qC3ogQh.gif -->
<!-- https://imgur.com/qC3ogQh -->
<!-- https://imgur.com/a/yfvBbRL -->
<img src="src/assets/project5_walkthrough.gif" width="600" alt='Walkthrough GIF' />

---

## Notes

- API used: [Open Brewery DB](https://www.openbrewerydb.org/)

---

## License

    Copyright 2025 Deborah Oladokun

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
