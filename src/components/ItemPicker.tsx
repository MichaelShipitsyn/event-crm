import React, { useRef, useState, useEffect } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import {
  makeStyles,
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

type Entity = {
  id: number;
  name: string;
  [key: string]: any;
};

type Props = {
  onClose: () => void;
  loadMore: () => void;
  onSelect: (id: number) => void;
  items: Array<Entity>;
  hasNextPage: boolean;
  isLoading: boolean;
};

const useStyles = makeStyles((theme: Theme) => {
  return {
    listWrap: {
      maxHeight: '300px',
      overflow: 'auto'
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
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

export const ItemPicker: FC<Props> = ({
  onClose,
  onSelect,
  items,
  loadMore,
  hasNextPage,
  isLoading
}) => {
  const [checkedId, setCheckedId] = useState<number | null>(null);
  const classes = useStyles();

  const refElement = useRef(null);

  const infiniteRef = useInfiniteScroll<HTMLUListElement>({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: 'parent'
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
          <div className={classes.listWrap}>
            <List ref={infiniteRef} dense className={classes.list}>
              {items.map((item) => {
                const labelId = `checkbox-list-secondary-label-${item.id}`;
                return (
                  <ListItem
                    key={item.id}
                    button
                    className={classes.listItem}
                    onClick={() => handleCheckItem(item.id)}
                  >
                    <ListItemText id={labelId} primary={`${item.name}`} />
                    <ListItemSecondaryAction
                      className={classes.itemSecondaryAction}
                    >
                      {checkedId === item.id ? (
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
