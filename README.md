# My Manga Shelf [![Netlify Status](https://api.netlify.com/api/v1/badges/723dcb25-8f49-40f3-859b-810ec36daee6/deploy-status)](https://app.netlify.com/sites/my-manga-shelf/deploys)

My Manga Shelf is a mobile-first application that allows a user to keep track of their manga collection right at their fingertips.

[View App](https://my-manga-shelf.netlify.app/)

## About the User
This app is beneficial to a user with a large manga collection.  The more they have, the harder it can be to keep track of.  My Manga Shelf allows the user to add series and volumes to their collection.  Since it is mobile-first, it is convenient for the user to access this information while they're out shopping, so they do not buy duplicates, or miss out on buying something they needed.

## Features
- Users will log in to the app using Google Authentication, and their data is user-specific.
- Users are able to access a quickview of their collection and wishlist.
- Users can add a series to their profile, either manually or by searching an external API ([Jikan API](https://jikan.moe/)) that will pre-populate data for them.
- Users can add volumes to those series, and indicate whether they own that volume (will add it to their collection) or if they want that volume (will add it to their wishlist)
- Users can edit series and volume information
- Users can delete volumes, or they can delete an entire series.  If they delete the series, it will also delete the associated volumes.
- Users can be recommended similar manga if they have series that were pulled from the external API.

## Project Screenshots
<img height="500" width="236" alt="App screenshot" src="https://user-images.githubusercontent.com/112125700/226486155-36ca3f3e-849b-4f74-bf19-ae4c2a354778.png"> <img height="500" width="236" alt="App screenshot" src="https://user-images.githubusercontent.com/112125700/226486245-708ae0d4-76c8-4efe-8b58-84f3df00f10b.png"> <img height="500" width="236" alt="App screenshot" src="https://user-images.githubusercontent.com/112125700/226486358-af83c5f1-2a14-4e90-9ff6-8ae8930be695.png"> <img height="500" width="236" alt="App screenshot" src="https://user-images.githubusercontent.com/112125700/226486569-cd6af95e-7dd0-4b3a-a168-b4bdc4ac439b.png">

## Relevant Links <!-- Link to all the things that are required outside of the ones that have their own section -->
- [Check out the deployed site](https://my-manga-shelf.netlify.app/)
- [Wireframes](https://www.figma.com/file/CoX3hjzOI93AqjEv1163Bk/My-Manga-Shelf?node-id=0%3A1&t=eckr9ssu9YBc8y0Q-1)
- [Project Board](https://github.com/users/WhitleyBeers/projects/1)

## Get Started
1. Set up a [Firebase](https://firebase.google.com/) project.
2. Clone My Manga Shelf to your local machine:
```
$ git clone git@github.com:WhitleyBeers/My-Manga-Shelf.git
```
3. Move into the newly created directory and open the code:
```
$ cd My-Manga-Shelf
$ code .
```
4. Create an .env file at the root of the project and paste the following, then put the values from your Firebase project into the empty strings:
```
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_DATABASE_URL=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
```
5. While in your root directory, run from the terminal:
```
$ npm install OR npm i
```
```
$ npm run prepare
```
6. To start the app on your local server, run from the terminal:
```
npm run dev
```
7. Go to [http://localhost:3000](http://localhost:3000) in your browser
8. Enjoy!

## Code Snippet
```
<Tab eventKey="collection" title="Collection">
  {collectionVolumes.length > 0 ? (
    collectionVolumes.map((volume) => (
      <VolumeCollectionCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
    ))
  ) : <h4>There&apos;s nothing here!</h4>}
</Tab>
<Tab eventKey="wishlist" title="Wishlist">
  {wishlistVolumes.length > 0 ? (
    wishlistVolumes.map((volume) => (
      <VolumeWishlistCards key={volume.firebaseKey} volumeObj={volume} onUpdate={getVolumeCards} />
    ))
  ) : <h4>There&apos;s nothing here!</h4>}
</Tab>
```

## Tech Stack
<a href="https://reactjs.org/" title="React"><img src="https://github.com/get-icon/geticon/raw/master/icons/react.svg" alt="React" width="50px" height="50px"></a>
<a href="https://react-bootstrap.github.io/" title="React Bootstrap"><img src="https://user-images.githubusercontent.com/112125700/226490565-5b0088db-60eb-4389-9287-83eaa34f33e8.png" alt="React Bootstrap" width="50px" height="50px"></a>
<img src="https://user-images.githubusercontent.com/112125700/226491169-7d7e44df-908f-4ddd-89c2-23d1f53a54ba.png" alt="Javascript" width="50px" height="50px">
<a href="https://firebase.google.com/" title="Firebase"><img src="https://user-images.githubusercontent.com/112125700/226491361-68248e47-9434-430a-b2c1-c8866fd1c090.png" alt="Firebase" width="50px" height="50px"></a>
<a href="https://nextjs.org/" title="Next.js"><img src="https://user-images.githubusercontent.com/112125700/226491454-44e269a0-4d80-4ff7-b27a-111ab656f39b.png" alt="Next.js" width="50px" height="50px"></a>

## Contributors
- [Whitley Beers](https://github.com/WhitleyBeers)
