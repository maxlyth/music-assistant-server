import express from 'express';
import session from 'express-session';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'headsoothe', resave: true, saveUninitialized: true }));


const params = {
  teamID: 'QGP4V7TPS2',
  keyID: '7P95UP4KS4',
  privateKeyLocation: '/Users/max.lyth/github.nosync/passport-apple-music/AuthKey_7P95UP4KS4.p8',
  callbackURL: 'http://localhost:3000/auth/apple-music/callback',
  passReqToCallback: true,
  jwtOptions: {
    expiresIn: '180d',
  },
};

app.get("/login", (req, res) => {
  res.send(`
    <h1>Logged in as ${req && req.user && req.user.displayName}</h1>
    <p>Access Token: ${req && req.user && req.user.accessToken}</p>
    <p>Refresh Token: ${req && req.user && req.user.refreshToken}</p>
    <p>Expires In: ${req && req.user && req.user.expiresIn}</p>
  `);
});

app.post("/auth", function(req, res, next) {
  passport.authenticate('apple-music', function(err, user, info) {
    if (err) {
      if (err == "AuthorizationError") {
        res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again!");
      } else if (err == "TokenError") {
        res.send("Oops! Couldn't get a valid token for Apple Music!");
      }
    } else {
      res.json(user);
    }
  })(req, res, next);
});

app.get('/', (req, res) => {
  res.send(`
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://js-cdn.music.apple.com/musickit/v3/musickit.js" data-web-components async></script>
    <link as="style" rel="stylesheet" id="apple-web-fonts" href="//www.apple.com/wss/fonts?families=SF+Pro,v2|SF+Pro+Icons,v3">
    <title>Music Assistant MusicKit Redirect</title>
    <link rel="stylesheet" href="https://authorize.music.apple.com/assets/index.9811439f.css">
    <style>
      .icons img  {
        width: 15vw;
        max-width: 76px;
      }
      .icons svg {
        width: 15vw;
        max-width: 76px;
      }
      button {
        display: none;
      }
    </style>
    <script>
        const app_token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjdQOTVVUDRLUzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJRR1A0VjdUUFMyIiwiaWF0IjoxNzQ1NDQxOTg5LCJleHAiOjE3NjA5OTM5ODl9.Wkb_9p54dLSLljAKRcBmLCt9xdLuPkNpWhC7P6GctajyquGvzG7SdQLYe-dOd0Vztfe9_shq3QzmWjbIEjHD_g';
        const return_url = '#';
        var music = null;
        console.log('App token:', app_token);
        console.log('Return URL:', return_url);

        setTimeout(()=>{document.getElementById('close_button').style.display = "inline-block"}, 7500);
        // Check for existing MusicKit saved data

        function mkSignIn() {
            document.getElementById('signin_button').disabled = true;
            document.getElementById('message').innerHTML = "Apple Signin window should open…";
            document.getElementById('sub-message').innerHTML = "If the Apple Music authentication window does not open, please check the MusicKit token and try again.";
            music.authorize().then(function(token) {
                document.getElementById('close_button').style.display = "inline-block";
                window.location.href = return_url + "?music-user-token=" + encodeURIComponent(token);
            })
            return null;
        }

        function mkSignOut() {
            document.getElementById('message').innerHTML = "his window should close…";
            music.unauthorize()
            window.location.href = return_url;
            document.getElementById('close_button').style.display = "inline-block";
        }

        document.addEventListener('musickitloaded', function() {
            // MusicKit global is now defined
            document.getElementById('message').innerHTML = "Apple MusicKit Authentication loaded";
            mkLoaded = true;
            MusicKit.configure({
                developerToken: app_token,
                app: {
                    name: 'MusicAssistant',
                    build: '2025.1.1',
                }
            }).then(() => {
                music = MusicKit.getInstance();
                if (music.isAuthorized) {
                    document.getElementById('message').innerHTML = "Already authorized";
                    document.getElementById('signout_button').style.display = "inline-block";
                    return;
                } else {
                    document.getElementById('message').innerHTML = "Not signed in";
                    document.getElementById('signin_button').style.display = "inline-block";
                }
            });
        });
    </script>
  </head>
  <body>
    <div id="app" class="container">
      <div class="base-content-wrapper theme-music base-authorization-request" data-test="oauth-authorization-request-third-party">
        <section class="base-content-wrapper__content">
          <div class="icons base-authorization-request__icons-container">
            <div class="base-authorization-request__icon">
              <div class="base-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Artwork" x="0px" y="0px" width="76px" height="76px" viewBox="0 0 361 361" style="enable-background:new 0 0 361 361;" xml:space="preserve">
                <style type="text/css">
                  .st0{fill-rule:evenodd;clip-rule:evenodd;fill:url(#SVGID_1_);}
                  .st1{fill-rule:evenodd;clip-rule:evenodd;fill:#FFFFFF;}
                </style>
                <g id="Layer_5">
                  <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="180" y1="358.6047" x2="180" y2="7.7586">
                    <stop offset="0" style="stop-color:#FA233B"/>
                    <stop offset="1" style="stop-color:#FB5C74"/>
                  </linearGradient>
                  <path class="st0" d="M360,112.61c0-4.3,0-8.6-0.02-12.9c-0.02-3.62-0.06-7.24-0.16-10.86c-0.21-7.89-0.68-15.84-2.08-23.64   c-1.42-7.92-3.75-15.29-7.41-22.49c-3.6-7.07-8.3-13.53-13.91-19.14c-5.61-5.61-12.08-10.31-19.15-13.91   c-7.19-3.66-14.56-5.98-22.47-7.41c-7.8-1.4-15.76-1.87-23.65-2.08c-3.62-0.1-7.24-0.14-10.86-0.16C255.99,0,251.69,0,247.39,0   H112.61c-4.3,0-8.6,0-12.9,0.02c-3.62,0.02-7.24,0.06-10.86,0.16C80.96,0.4,73,0.86,65.2,2.27c-7.92,1.42-15.28,3.75-22.47,7.41   c-7.07,3.6-13.54,8.3-19.15,13.91c-5.61,5.61-10.31,12.07-13.91,19.14c-3.66,7.2-5.99,14.57-7.41,22.49   c-1.4,7.8-1.87,15.76-2.08,23.64c-0.1,3.62-0.14,7.24-0.16,10.86C0,104.01,0,108.31,0,112.61v134.77c0,4.3,0,8.6,0.02,12.9   c0.02,3.62,0.06,7.24,0.16,10.86c0.21,7.89,0.68,15.84,2.08,23.64c1.42,7.92,3.75,15.29,7.41,22.49c3.6,7.07,8.3,13.53,13.91,19.14   c5.61,5.61,12.08,10.31,19.15,13.91c7.19,3.66,14.56,5.98,22.47,7.41c7.8,1.4,15.76,1.87,23.65,2.08c3.62,0.1,7.24,0.14,10.86,0.16   c4.3,0.03,8.6,0.02,12.9,0.02h134.77c4.3,0,8.6,0,12.9-0.02c3.62-0.02,7.24-0.06,10.86-0.16c7.89-0.21,15.85-0.68,23.65-2.08   c7.92-1.42,15.28-3.75,22.47-7.41c7.07-3.6,13.54-8.3,19.15-13.91c5.61-5.61,10.31-12.07,13.91-19.14   c3.66-7.2,5.99-14.57,7.41-22.49c1.4-7.8,1.87-15.76,2.08-23.64c0.1-3.62,0.14-7.24,0.16-10.86c0.03-4.3,0.02-8.6,0.02-12.9V112.61   z"/>
                </g>
                <g id="Glyph_2_">
                  <g>
                    <path class="st1" d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3    c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62c0,0,0,109.32,0,133.92c0,3.13-0.25,6.17-2.37,8.76    c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01    c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82    c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61c3.9-2.3,7.24-5.37,9.85-9.11    c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26l0-116.15c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75    c5.79-1.11,8.52,0.54,8.52,6.61l0,79.29c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99    c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51    c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98    c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46    C263.54,58.3,260.29,54.5,254.5,55z"/>
                  </g>
                </g>
                </svg><p class="base-icon__label">Apple Music</p>
              </div>
            </div>
            <div class="base-authorization-request__arrows"></div>
            <div class="base-authorization-request__icon">
              <div class="base-icon">
              <img src="data:image/png;base64,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"><p class="base-icon__label">Music Assistant</p>
              </div>
            </div>
          </div>
          <h1 class="base-content-wrapper__title typography-label">
            <span id="message">Apple MusicKit is loading</span>
          </h1>
          <p id="sub-message" class="base-content-wrapper__description typography-body-tight">SIgn in with Apple to allow Music Assistant to access your Apple Music account.</p>
          <p>
            <button id="signin_button" class="button button-block button-elevated button-primary base-button base-button--primary base-content-wrapper__button" onclick="mkSignIn();">Sign In</button>
            <button id="signout_button" onclick="mkSignOut();">Sign Out</button>
          </p>
          <p>
            <button id="close_button" class="button button-block button-elevated button-secondary base-button base-button--secondary base-content-wrapper__button" onclick="window.location.href = return_url;">Close</button>
          </p>
        </section>
        <div class="privacy-summary__link-container">
          <a class="privacy-summary__link-text privacy-summary__link-text--margin-top typography-caption" onclick="music.unauthorize(); location.reload();" href="#">Use a different Apple&nbsp;Account</a>
        </div>
        <footer class="base-footer">
          <p class="base-footer__copyright" data-test="copyright">2025 Music Assistant. Support us on
            <a href="https://github.com/max-lyth/apple-music-auth-harness">GitHub</a>.</p>
        </footer>
      </div>
    </div>
  </body>
</html>
  `);
});

app.get('/old', (req, res) => {
  res.send(`
  `);
});

app.listen(3000, () => console.log('Listening on port 3000'));

/*

<script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>
<script>
   document.addEventListener('musickitloaded', function() {
       // MusicKit global is now defined
       MusicKit.configure({
          developerToken: 'eyJhbGciOiJFUzI1NiIsImtpZCI6IjdQOTVVUDRLUzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJRR1A0VjdUUFMyIiwiaWF0IjoxNzQ1NDQxOTg5LCJleHAiOjE3NjA5OTM5ODl9.Wkb_9p54dLSLljAKRcBmLCt9xdLuPkNpWhC7P6GctajyquGvzG7SdQLYe-dOd0Vztfe9_shq3QzmWjbIEjHD_g',
          app: {
              name: 'MA',
              build: '1.0.0',
          }
       })
       let music = MusicKit.getInstance();
       document.getElementById('login-btn').addEventListener('click', () => {
          music.authorize().then(function(token) {
              // do something with token here
              window.location.href += "?music-user-token=" + encodeURIComponent(token);
          }).catch (e => {
             console.log ('Error:' + e );
          });
       });
   });
</script>
<h1>Apple Music Authentication</h1>
<button id="login-btn">Login with Apple Music</button>


"{\"version\":\"3.2516.6-prerelease\",\"Events\":{\"configured\":\"musickitconfigured\",\"loaded\":\"musickitloaded\",\"audioTrackAdded\":\"audioTrackAdded\",\"audioTrackChanged\":\"audioTrackChanged\",\"audioTrackRemoved\":\"audioTrackRemoved\",\"authorizationStatusDidChange\":\"authorizationStatusDidChange\",\"authorizationStatusWillChange\":\"authorizationStatusWillChange\",\"bufferedProgressDidChange\":\"bufferedProgressDidChange\",\"capabilitiesChanged\":\"capabilitiesChanged\",\"autoplayEnabledDidChange\":\"autoplayEnabledDidChange\",\"drmUnsupported\":\"drmUnsupported\",\"eligibleForSubscribeView\":\"eligibleForSubscribeView\",\"forcedTextTrackChanged\":\"forcedTextTrackChanged\",\"hlsDaterangeUpdated\":\"player.hls.daterangeUpdated\",\"mediaCanPlay\":\"mediaCanPlay\",\"mediaElementCreated\":\"mediaElementCreated\",\"mediaItemStateDidChange\":\"mediaItemStateDidChange\",\"mediaItemStateWillChange\":\"mediaItemStateWillChange\",\"mediaPlaybackError\":\"mediaPlaybackError\",\"mediaSkipAvailable\":\"mediaSkipAvailable\",\"mediaRollEntered\":\"mediaRollEntered\",\"mediaUpNext\":\"mediaUpNext\",\"metadataDidChange\":\"metadataDidChange\",\"nowPlayingItemDidChange\":\"nowPlayingItemDidChange\",\"nowPlayingItemWillChange\":\"nowPlayingItemWillChange\",\"playInitiated\":\"playInitiated\",\"playbackBitrateDidChange\":\"playbackBitrateDidChange\",\"playbackDurationDidChange\":\"playbackDurationDidChange\",\"playbackProgressDidChange\":\"playbackProgressDidChange\",\"playbackRateDidChange\":\"playbackRateDidChange\",\"playbackStateDidChange\":\"playbackStateDidChange\",\"playbackStateWillChange\":\"playbackStateWillChange\",\"playbackTargetAvailableDidChange\":\"playbackTargetAvailableDidChange\",\"playbackTargetIsWirelessDidChange\":\"playbackTargetIsWirelessDidChange\",\"playbackTimeDidChange\":\"playbackTimeDidChange\",\"playbackVolumeDidChange\":\"playbackVolumeDidChange\",\"playerTypeDidChange\":\"playerTypeDidChange\",\"presentationModeDidChange\":\"presentationModeDidChange\",\"primaryPlayerDidChange\":\"primaryPlayerDidChange\",\"queueIsReady\":\"queueIsReady\",\"queueItemsDidChange\":\"queueItemsDidChange\",\"queueItemForStartPosition\":\"queueItemForStartPosition\",\"queuePositionDidChange\":\"queuePositionDidChange\",\"shuffleModeDidChange\":\"shuffleModeDidChange\",\"repeatModeDidChange\":\"repeatModeDidChange\",\"storefrontCountryCodeDidChange\":\"storefrontCountryCodeDidChange\",\"storefrontIdentifierDidChange\":\"storefrontIdentifierDidChange\",\"textTrackAdded\":\"textTrackAdded\",\"textTrackChanged\":\"textTrackChanged\",\"textTrackRemoved\":\"textTrackRemoved\",\"timedMetadataDidChange\":\"timedMetadataDidChange\",\"userTokenDidChange\":\"userTokenDidChange\",\"webComponentsLoaded\":\"musickitwebcomponentsloaded\"},\"PlayActivityEndReasonType\":{\"0\":\"NOT_APPLICABLE\",\"1\":\"OTHER\",\"2\":\"TRACK_SKIPPED_FORWARDS\",\"3\":\"PLAYBACK_MANUALLY_PAUSED\",\"4\":\"PLAYBACK_SUSPENDED\",\"5\":\"MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM\",\"6\":\"PLAYBACK_PAUSED_DUE_TO_INACTIVITY\",\"7\":\"NATURAL_END_OF_TRACK\",\"8\":\"PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT\",\"9\":\"TRACK_BANNED\",\"10\":\"FAILED_TO_LOAD\",\"11\":\"PAUSED_ON_TIMEOUT\",\"12\":\"SCRUB_BEGIN\",\"13\":\"SCRUB_END\",\"14\":\"TRACK_SKIPPED_BACKWARDS\",\"15\":\"NOT_SUPPORTED_BY_CLIENT\",\"16\":\"QUICK_PLAY\",\"17\":\"EXITED_APPLICATION\",\"NOT_APPLICABLE\":0,\"OTHER\":1,\"TRACK_SKIPPED_FORWARDS\":2,\"PLAYBACK_MANUALLY_PAUSED\":3,\"PLAYBACK_SUSPENDED\":4,\"MANUALLY_SELECTED_PLAYBACK_OF_A_DIFF_ITEM\":5,\"PLAYBACK_PAUSED_DUE_TO_INACTIVITY\":6,\"NATURAL_END_OF_TRACK\":7,\"PLAYBACK_STOPPED_DUE_TO_SESSION_TIMEOUT\":8,\"TRACK_BANNED\":9,\"FAILED_TO_LOAD\":10,\"PAUSED_ON_TIMEOUT\":11,\"SCRUB_BEGIN\":12,\"SCRUB_END\":13,\"TRACK_SKIPPED_BACKWARDS\":14,\"NOT_SUPPORTED_BY_CLIENT\":15,\"QUICK_PLAY\":16,\"EXITED_APPLICATION\":17},\"PlaybackActions\":{\"REPEAT\":\"REPEAT\",\"SHUFFLE\":\"SHUFFLE\",\"AUTOPLAY\":\"AUTOPLAY\"},\"PlaybackBitrate\":{\"64\":\"STANDARD\",\"256\":\"HIGH\",\"STANDARD\":64,\"HIGH\":256},\"PlaybackMode\":{\"0\":\"PREVIEW_ONLY\",\"1\":\"MIXED_CONTENT\",\"2\":\"FULL_PLAYBACK_ONLY\",\"PREVIEW_ONLY\":0,\"MIXED_CONTENT\":1,\"FULL_PLAYBACK_ONLY\":2},\"PlaybackStates\":{\"0\":\"none\",\"1\":\"loading\",\"2\":\"playing\",\"3\":\"paused\",\"4\":\"stopped\",\"5\":\"ended\",\"6\":\"seeking\",\"8\":\"waiting\",\"9\":\"stalled\",\"10\":\"completed\",\"none\":0,\"loading\":1,\"playing\":2,\"paused\":3,\"stopped\":4,\"ended\":5,\"seeking\":6,\"waiting\":8,\"stalled\":9,\"completed\":10},\"PlaybackType\":{\"0\":\"none\",\"1\":\"preview\",\"2\":\"unencryptedFull\",\"3\":\"encryptedFull\",\"none\":0,\"preview\":1,\"unencryptedFull\":2,\"encryptedFull\":3},\"PlayerRepeatMode\":{\"0\":\"none\",\"1\":\"one\",\"2\":\"all\",\"none\":0,\"one\":1,\"all\":2},\"PlayerShuffleMode\":{\"0\":\"off\",\"1\":\"songs\",\"off\":0,\"songs\":1},\"PresentationMode\":{\"0\":\"pictureinpicture\",\"1\":\"inline\",\"pictureinpicture\":0,\"inline\":1},\"SKRealm\":{\"0\":\"MUSIC\",\"1\":\"PODCAST\",\"2\":\"TV\",\"MUSIC\":0,\"PODCAST\":1,\"TV\":2},\"VideoTypes\":{\"movie\":true,\"musicVideo\":true,\"musicMovie\":true,\"trailer\":true,\"tvEpisode\":true,\"uploadedVideo\":true,\"uploaded-videos\":true,\"music-videos\":true,\"music-movies\":true,\"tv-episodes\":true,\"Bonus\":true,\"Extra\":true,\"Episode\":true,\"Movie\":true,\"Preview\":true,\"Promotional\":true,\"Season\":true,\"Show\":true,\"Vod\":true,\"EditorialVideoClip\":true,\"RealityVideo\":true,\"SportingEvent\":true,\"LiveService\":true}}" = $4
*/