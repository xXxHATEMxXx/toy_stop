import * as React from 'react';
import Home from './home';
import { SnackbarProvider, useSnackbar } from 'notistack';


export default function Index() {
  const providerRef = React.useRef();

  return (  
    <SnackbarProvider ref={providerRef} maxSnack={2} preventDuplicate>
       <Home/>
    </SnackbarProvider>
  );
}
