import React from 'react';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SvgIcon from '@material-ui/icons/ChevronLeft';

/** The cards list selected data page control UI  */
const Pager = (props: {
    /** Can we open the previous page */
    enablePrevPage: boolean,
    /** Can we open the next page */
    enableNextPage: boolean,
    /** The page is currently being displayed */
    page: number,
    /** The page has changed */
    onPageChanged: (newPage: number) => void
}) => {
    return (
        <Grid container spacing={1} direction="row" justify="space-between" alignItems="center">
            <Grid item>
                <ChevronLeftIcon 
                    style={{
                        visibility: props.enablePrevPage ? undefined : "hidden"
                    }}
                    fontSize="large"
                    onClick={() => {
                        props.onPageChanged(props.page - 1);
                    }}
                    />
            </Grid>
            <Grid item>
                <ChevronRightIcon 
                    style={{
                        visibility: props.enableNextPage ? undefined : "hidden"
                    }}
                    fontSize="large"
                    onClick={() => {
                        props.onPageChanged(props.page + 1);
                    }}
                    />
            </Grid>
        </Grid>
    );
};

export default Pager;