export class LocalStorageService {
  setInformation(storageName: string, data: any) {
    localStorage.setItem(storageName, JSON.stringify(data));
  }

  getInformation(storageName: string) {
    const data = localStorage.getItem(storageName);

    if(data != null) {
      return JSON.parse(data);
    }
  }

  clearInformation(storageName: string) {
    localStorage.removeItem(storageName);
  }

  cleanAll() {
    localStorage.clear()
  }

  cleanTemporaryLocalStorages() {
    this.clearInformation('currentPostNumber');
    this.clearInformation('currentEditSeries');
    this.clearInformation('currentEditMovie');
  }
}
