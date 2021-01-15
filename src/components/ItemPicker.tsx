import React, { useRef, useState } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import {
  makeStyles,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
  SvgIcon
} from '@material-ui/core';
import { Check as CheckIcon, X as XIcon } from 'react-feather';
import { Theme } from 'theme';
import { useScrollTrigger } from 'hooks/useScrollTrigger';

type Props = {
  onClose: () => void;
  onSelect: (id: number) => void;
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      maxHeight: '300px',
      overflow: 'auto',
      border: '1px solid #e8e8e8',
      borderRadius: '0 0 3px 3px'
    },
    listItem: {
      borderBottom: '1px solid #e8e8e8',
      padding: '12px 14px'
    },
    iconButton: {
      border: '1px solid rgba(84, 110, 122, 0.3)',
      width: '24px',
      height: '24px',
      padding: '5px'
    },
    checkedIcon: {
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.main
      }
    },
    dialogActions: {
      padding: '16px 24px 8px'
    },
    itemSecondaryAction: {
      pointerEvents: 'none'
    },
    dialogTitle: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    closeButton: {
      position: 'relative',
      right: '-4px'
    }
  };
});

export const ItemPicker: FC<Props> = ({ onClose, onSelect }) => {
  const [checkedId, setCheckedId] = useState<number | null>(null);
  const classes = useStyles();

  const loadMore = () => {
    console.log('loadMore');
  };

  const refElement = useRef(null);
  const { scrollHandler, scrollToTop } = useScrollTrigger({
    threshold: 500,
    onReachBottom: loadMore,
    refElement
  });

  const handleCheckItem = (value: number) => {
    if (value === checkedId) {
      setCheckedId(null);
      return;
    }
    setCheckedId(value);
  };

  const handleSelectClient = () => {
    if (checkedId !== null) {
      onSelect(checkedId);
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        disableTypography
        id="alert-dialog-title"
        className={classes.dialogTitle}
      >
        <Typography variant="h4">Выбор клиента</Typography>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <SvgIcon fontSize="small">
            <XIcon />
          </SvgIcon>
        </IconButton>
      </DialogTitle>
      <DialogContent id="alert-dialog-description">
        <Typography variant="body2" color="textSecondary">
          Выберите клиента, чтобы прикрепить его к заказу
        </Typography>
        <div>
          <TextField
            placeholder="Поиск..."
            fullWidth
            margin="normal"
            name="newClient.phone"
            type="text"
            variant="outlined"
          />
          <List
            onScroll={scrollHandler}
            ref={refElement}
            dense
            className={classes.list}
          >
            {[...new Array(45).keys()].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={value}
                  button
                  className={classes.listItem}
                  onClick={() => handleCheckItem(value)}
                >
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                  <ListItemSecondaryAction
                    className={classes.itemSecondaryAction}
                  >
                    {checkedId === value ? (
                      <IconButton
                        className={classes.checkedIcon}
                        classes={{ root: classes.iconButton }}
                      >
                        <SvgIcon fontSize="small">
                          <CheckIcon color="#fff" />
                        </SvgIcon>
                      </IconButton>
                    ) : (
                      <IconButton classes={{ root: classes.iconButton }}>
                        {' '}
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <Button className="actionButton" variant="outlined" onClick={onClose}>
          Отменить
        </Button>
        <Button
          disabled={checkedId === null}
          className="actionButton"
          color="primary"
          variant="contained"
          onClick={handleSelectClient}
        >
          Продолжть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
