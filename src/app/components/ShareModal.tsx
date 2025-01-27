import React, {useEffect, useState} from 'react';
import Toggle from './generic/Toggle';
import {observer} from 'mobx-react-lite';
import {useStore} from '@/state';
import {useTheme} from "next-themes";
import Modal from "@/app/components/generic/Modal";
import power from '@/public/img/misc/power.webp';
import LazyImage from "@/app/components/generic/LazyImage";
import {ImportableData} from "@/types/State";
import {toJS} from "mobx";
import {generateShortlink, isDevServer} from "@/utils";
import {toast} from "react-toastify";

const ShareModal: React.FC = observer((props) => {
  const store = useStore();
  const {ui} = store;

  const domain = isDevServer() ? 'http://localhost:3000/' : 'https://dps.osrs.wiki/'
  const [shareId, setShareId] = useState('');
  const [error, setError] = useState(false);

  const generateShareLink = async () => {
    setShareId('');
    setError(false);

    // Get the data we need from the internal store
    const data: ImportableData = {
      loadouts: toJS(store.loadouts),
      monster: toJS(store.monster),
      selectedLoadout: store.selectedLoadout
    }

    // Make an API call to generate a share link
    try {
      setShareId(await generateShortlink(data));
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    if (ui.showShareModal) {
      generateShareLink();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ui.showShareModal]);

  return (
    <>
      <Modal
        isOpen={ui.showShareModal}
        setIsOpen={(b) => store.updateUIState({showShareModal: b})}
        title={'Share'}
      >
        <div className={'text-sm'}>
          <p>You can share your current calculator state (loadouts and selected monster) with friends by sending them the link below.</p>
          <div className={'mt-2 font-semibold'}>
            <input readOnly={true} className={'form-control w-full'} value={shareId ? `${domain}?id=${shareId}` : 'Generating...'} />
          </div>
          {error && (
            <p className={'mt-2 text-red-400 dark:text-red-200'}>
              There was a problem generating a share link. Please try again.
            </p>
          )}
        </div>
      </Modal>
    </>
  )
})

export default ShareModal;
