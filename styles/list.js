import { greenSheen, white, red } from './colors';
export const listEmpty = {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
};
export const listEmptyText = {
    fontSize: 18,
    color: greenSheen,
    textAlignVertical: 'center',
};
export const listRowFront = {
    backgroundColor: white,
};
export const listRowBack = {
    alignItems: 'center',
    backgroundColor: red,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
};
export const listBackTextWhite = {
    color: white,
};
export const listBackRightBtn = {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: red,
    bottom: 0,
    top: 0,
    right: 0,
    width: 100,
};
