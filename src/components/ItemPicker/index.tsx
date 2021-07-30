import {
  Button,
  Dialog,
  DialogContent,
  ListItemText,
  SvgIcon,
  TextField,
  Typography,
} from '@material-ui/core';
import debounce from 'lodash.debounce';
import React, { useState } from 'react';
import { Check as CheckIcon, X as XIcon } from 'react-feather';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import {
  StyledCheckedIcon,
  StyledCloseButton,
  StyledDialogActions,
  StyledDialogTitle,
  StyledIconButton,
  StyledItemSecondaryAction,
  StyledList,
  StyledListItem,
  StyledListWrap,
} from './styled';

type Entity = {
  [key: string]: unknown;
  id: number;
  name: string;
};

type Props = {
  onClose: () => void;
  loadMore: () => void;
  getItemsByQuery: (query: string) => void;
  onSelect: (id: number) => void;
  items: Entity[];
  hasNextPage: boolean;
  isLoading: boolean;
};

export const ItemPicker = ({
  onClose,
  onSelect,
  items,
  loadMore,
  hasNextPage,
  isLoading,
  getItemsByQuery,
}: Props) => {
  const [checkedId, setCheckedId] = useState<number | null>(null);

  const infiniteRef = useInfiniteScroll<HTMLUListElement>({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: 'parent',
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

  const handleQueryChange = debounce((query) => getItemsByQuery(query), 500);

  return (
    <Dialog
      open
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <StyledDialogTitle disableTypography id="alert-dialog-title">
        <Typography variant="h4">Выбор клиента</Typography>
        <StyledCloseButton onClick={onClose}>
          <SvgIcon fontSize="small">
            <XIcon />
          </SvgIcon>
        </StyledCloseButton>
      </StyledDialogTitle>
      <DialogContent id="alert-dialog-description">
        <Typography variant="body2" color="textSecondary">
          Выберите клиента, чтобы прикрепить его к заказу
        </Typography>
        <div>
          <TextField
            placeholder="Поиск..."
            fullWidth
            margin="normal"
            type="text"
            variant="outlined"
            onChange={(event) => handleQueryChange(event.target.value)}
          />
          <StyledListWrap>
            <StyledList ref={infiniteRef} dense>
              {items.map((item) => {
                const labelId = `checkbox-list-secondary-label-${item.id}`;
                return (
                  <StyledListItem
                    key={item.id}
                    button
                    onClick={() => handleCheckItem(item.id)}
                  >
                    <ListItemText id={labelId} primary={`${item.name}`} />
                    <StyledItemSecondaryAction>
                      {checkedId === item.id ? (
                        <StyledCheckedIcon>
                          <SvgIcon fontSize="small">
                            <CheckIcon color="#fff" />
                          </SvgIcon>
                        </StyledCheckedIcon>
                      ) : (
                        <StyledIconButton />
                      )}
                    </StyledItemSecondaryAction>
                  </StyledListItem>
                );
              })}
            </StyledList>
          </StyledListWrap>
        </div>
      </DialogContent>
      <StyledDialogActions>
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
      </StyledDialogActions>
    </Dialog>
  );
};
