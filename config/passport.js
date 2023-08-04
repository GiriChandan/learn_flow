const mongoose = require("mongoose");

const User = mongoose.model("users");

const passport= require('passport');
const googleStrategy= require('passport-google-oauth20').Strategy;

//clientID- 651668834344-jmqd1klm1si5ntf5j01jc744frvqsnl7.apps.googleusercontent.com;
//clientSecret- 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
passport.use(new googleStrategy({
    clientID:"651668834344-jmqd1klm1si5ntf5j01jc744frvqsnl7.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      googleID: profile.id,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      displayName: profile.displayName,
      email: profile.emails[0].value,
      image: profile.photos[0].value,
    };

    try {
      let user = await User.findOne({ googleID: profile.id });
      if (user) {
        // User Exists
        console.log("Exist", user);
        done(null, user);
      } else {
        // Sign up for the first time
        user = await User.create(newUser);
        console.log("New", user);
        done(null, user);
      }
    } catch (error) {
      console.log(error);
      done(error);
    }
  }
)
);

passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
try {
  const user = await User.findById(id);
  done(null, user);
} catch (error) {
  done(error);
}
});