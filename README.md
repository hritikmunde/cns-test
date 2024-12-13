# Angular Application with NGXS State Management

## Overview

This project is an Angular application that utilizes NGXS for state management. The application fetches anatomical structures from an API, displays them in a list, and allows users to view detailed information in a modal. It also handles structures without IDs gracefully, providing appropriate error messages.

## Features

- Fetches anatomical structures from an external API.
- Displays structures in a list format.
- Uses NGXS for state management.
- Handles structures without IDs and shows error messages in a modal.
- Responsive design with Angular Material components.

## Technologies Used

- Angular (version 18 or higher)
- NGXS for state management
- Angular Material for UI components
- RxJS for reactive programming
- TypeScript for type safety

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/<USERNAME>/<REPO_NAME>.git
   cd <REPO_NAME>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Install NGXS:**
   ```bash
   npm install @ngxs/store @ngxs/devtools-plugin --save
   ```

## Project Structure

- `src/app/`: Contains all application components, services, and state management files.
- `src/app/state/`: Contains the NGXS state management files.
- `src/app/modal/`: Contains the modal component for displaying structure details and error messages.
- `src/app/data-fetch.service.ts`: Service for fetching data from the API.
- `src/app/app.component.ts`: Main application component.
- `src/app/app.module.ts`: Main application module where NGXS is configured.
- `src/app/app.routes.ts`: Contains routing configuration for the application.
- `src/styles.css`: Global styles for the application.
- `src/main.ts`: Entry point for the Angular application.
- `src/index.html`: Main HTML file for the application.

## NGXS Integration

1. **Create State Management:**
   - Created a new state file `src/app/state/structure.state.ts` to manage the state of anatomical structures.
   - Defined actions and state models to handle the addition of structures and any error messages.

   ```typescript
   @State<StructureStateModel>({
     name: 'structure',
     defaults: {
       structures: [],
       errorMessages: []
     }
   })
   ```

2. **Update App Module:**
   - Modified `src/app/app.module.ts` to include the NGXS module and the newly created state.

   ```typescript
   imports: [
     NgxsModule.forRoot([StructureState]),
     // other imports
   ],
   ```

3. **Modify Data Fetch Service:**
   - Updated `src/app/data-fetch.service.ts` to dispatch actions to the NGXS store instead of managing state locally.

   ```typescript
   this.store.dispatch(new AddStructure(structure));
   ```

4. **Update App Component:**
   - Refactored `src/app/app.component.ts` to select data from the NGXS store and handle structures without IDs appropriately.

   ```typescript
   if (!structure.id || structure.id === 'No ID') {
     this.dialog.open(ModalComponent, {
       width: '500px',
       data: { error: `Structure "${structure.name}" has no ID.` }
     });
   }
   ```

5. **Update Modal Component:**
   - Ensured the `ModalComponent` can display error messages when structures without IDs are opened.

## Error Handling

- Structures without IDs are displayed in the list, and when a user attempts to view them, an error message is shown in the modal.
- The modal component handles both structure details and error messages.

## Deployment to GitHub Pages

To deploy the built code to GitHub Pages, follow these steps:

1. **Build the Application:**
   Run the following command to build the application:
   ```bash
   ng build --prod --base-href "https://<USERNAME>.github.io/<REPO_NAME>/"
   ```

2. **Install `gh-pages`:**
   If you haven't already, install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add Deployment Script:**
   Add the following script to your `package.json`:
   ```json
   "scripts": {
     "deploy": "ng build --prod --base-href https://<USERNAME>.github.io/<REPO_NAME>/ && npx gh-pages -d dist/<PROJECT_NAME>"
   }
   ```

4. **Deploy the Application:**
   Run the deployment script:
   ```bash
   npm run deploy
   ```

5. **Access Your Application:**
   After deployment, your application will be available at:
   ```
   https://<USERNAME>.github.io/<REPO_NAME>/
   ```

## Conclusion

This project successfully integrates NGXS for state management, allowing for a more scalable and maintainable application. The application meets the requirements of both phases, providing a user-friendly interface for displaying anatomical structures and handling errors gracefully.

If you have any questions or need further assistance, feel free to reach out!
