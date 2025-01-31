import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const drawerActions = createActionGroup({
    source: 'toggleDrawer',
    events: {
        'Toggle Drawer Open': emptyProps(),    
        'Toggle Drawer Close': emptyProps(),    
    }
});