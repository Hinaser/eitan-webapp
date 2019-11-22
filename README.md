<div>
  <h1 class="title">
    Starter template for react app development
  </h1>
  <p>
    What's included
  </p>
  <ul>
    <li>i18n</li>
    <li>Design Theme</li>
    <li>Routing</li>
    <li>Fully customizable Header/Sidebar</li>
    <li>Stylish scrollbar</li>
    <li>Global state management by Redux</li>
    <li>Backend service such as API/Storage</li>
    <li>Break point management library to develop different sizes of monitor at once.</li>
    <li>(Option) Firebase Integration (*)</li>
  </ul>
  <hr />
  <div>
    <h1 class="title">Project structure</h1>
    <div>
      <pre>
        .env                     Environment variables are defined here. You may need to configure REACT_APP_ENV/PUBLIC_URL before building for production.
        .firebaserc              (*) If you don't use firebase, remove this file.
        cors.json                (*) Setting file to enable CORS in firebase storage. If you don't use firebase, remove this file.
        firebase.json            (*) If you don't use firebase, remove this file.
        firestore.indexes.json   (*) If you don't use firebase, remove this file.
        firestore.rules          (*) If you don't use firebase, remove this file.
        storage.rules            (*) If you don't use firebase, remove this file.
        functions/               (*) Content related to Firebase cloud functions is saved under this folder. If you don't want firebase, delete this.
        public/                  Folder for static content
          static/
            html/
              home.en.html       The very html of this page. This page is fetched and rendered through service/httpRequest/index.ts.
        src/
          @types/                When type definition is not included with npm module nor not found on DefinitelyTyped, you can declare module here for temporal solution.
          i18n/
            locales/
              en.json            Language resource file for English
              ja.json            Language resource file for Japanese
          model/                 Data model which abstracts how data is fetched/updated and where data should be stored.
            collections/         Collection of model components
            connector/           Defines how data should be handled.
              ...
              firestore.ts       (*) if you don't use firebase, remove this file.
          module/                React Components is managed under this folder.
            outline.config.ts    Components defined here are loaded as header/sidebar
            route.config.tsx     Add routing path and component mapping here.
            theme.config.ts      Define theme name and theme content mapping here.
            App/                 Basically you won't need to edit files here frequently.
            component/           User-defined components are placed here.
              _AppHeader/        Default header component specified by outline.config.ts. All header component must call onHeightChange() at componentDidMount.
              _AppSidebar/       Default sidebar component specified by outline.config.ts. All sidebar component must call onWidthChange() at componentDidMount.
              _ErrorBoundary/    Component who catches error raised from page component or entire app.
              ...
              FirebaseSample/    (*) Sample component for testing firebase features. If you don't use firebase nor you've done testing, remove this folder.
              DataModel/         Sample component for testing data model.
          service/               Services which will be referred by multiple components should be managed under this folder.
            breakPointMonitor/   View Component switcher who monitors window size. When it reaches monitor size break point, it tries to re-render pre configured component based on the monitor size.
            firebase/            (*) Service for commanding firebase. If you don't use firebase delete this folder.
            httpRequest/         Service for HTTP Request by fetch/xhr.
            storage/             Service to use abstract storage.
          state/                 Redux-related files are placed under this folder.
            actions/             Manage redux actions.
            loader/
              ...
              firebaseLoader.ts  (*) Load app state from firebase storage. If you don't use firebase delete this file.
            reducer/             Define initial state and state shape.
            version/             Version-up migration code should be saved here.
          style/
            theme/               User-defined themes should be saved here.
              default.ts         Default theme. Theme interface in this file can be replaced with the one from @material-ui. If so, you can extend @material-ui theme with your customized themes.
              dark.ts            Dark theme.
      </pre>
    </div>
  </div>
  <hr />
  <div>
    <h1 class="title">* In case you don't need Firebase integration</h1>
    <div>
      <p>
        If you don't have a plan to use firebase, remove firebase folders mentioned above.
        Besides, please search for /*TODO*/ comments scattered in project files and follow the instructions at those comments to clear firebase dependent lines.
      </p>
      Next, please remove the following npm packages from package.json.
      <ul>
        <li>firebase</li>
        <li>firebase-tools</li>
      </ul>
      <p>
        Please also delete `deploy` npm script from package.json which is only for firebase hosting.
      </p>
    </div>
  </div>
  <hr />
  <div>
    <h1 class="title">Firebase setup</h1>
    <p><b>* Ignore this if you don't use firebase</b></p>
    <p>
      You first need to create project at firebase. When you successfully create firebase project, then you can
      obtain API-key and other firebase base configuration value from `Project settings` page.
    </p>
    <p>
      Once you get firebase project config values, please create <code>.env.local</code> file by copying <code>.env</code> file and place it under project root directory next to <code>.env</code> file.
      Then write firebase config values to <code>.env.local</code> file.
    </p>
    <p>
      Among those config values, you will find a project id. Please write the project id to <code>.firebaserc</code> for activate firebase tools.
    </p>
  </div>
  <hr />
  <div>
    <h1 class="title">Firebase storage setup</h1>
    <div>
      <p><b>* Ignore this if you don't use firebase</b></p>
      <p>
        You need to setup CORS for downloading data/files from firebase storage for cross origin request.<br/>
        Please follow the instruction
        <a href="https://firebase.google.com/docs/storage/web/download-files#cors_configuration" rel="noreferrer noopener" target="_blank">here</a>
      </p>
      <p>
        Also note that cors.json mentioned above link is already created under the project root directory.
      </p>
    </div>
  </div>
</div>
