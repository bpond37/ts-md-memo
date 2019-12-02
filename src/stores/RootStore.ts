import MemoStore from "./memo/MemoStores";

export default class RootStore {
  static instance: RootStore;
  memoStore = new MemoStore()
}