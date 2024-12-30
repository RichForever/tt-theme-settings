import { Controller, useFormContext } from 'react-hook-form';

import { Button, Panel, PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import styles from 'styles/SocialMediaPanel.module.scss';

const SocialMediaItem = ({ index, settingsGroup, handleRemove, isNew }) => {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext();
  const platform = watch(`${settingsGroup}.${index}.platform`);
  const title = platform || __('New Social Media', 'timbertail');

  return (
    <Panel>
      <PanelBody title={title} initialOpen={isNew}>
        <div style={{ marginTop: '16px' }}>
          <PanelRow>
            <Controller
              name={`${settingsGroup}.${index}.platform`}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Field is required'
                }
              }}
              render={({ field }) => (
                <div style={{ flex: 1 }}>
                  <TextControl
                    {...field}
                    label={__('Platform Name', 'timbertail')}
                    help={
                      errors?.[settingsGroup]?.[index]?.platform && (
                        <span className={styles['error-message']}>
                          {errors?.[settingsGroup]?.[index]?.platform.message}
                        </span>
                      )
                    }
                    __next40pxDefaultSize
                  />
                </div>
              )}
            />
          </PanelRow>
          <PanelRow>
            <Controller
              name={`${settingsGroup}.${index}.url`}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Field is required'
                }
              }}
              render={({ field }) => (
                <div style={{ flex: 1 }}>
                  <TextControl
                    {...field}
                    label={__('URL', 'timbertail')}
                    help={
                      errors?.[settingsGroup]?.[index]?.url && (
                        <span className={styles['error-message']}>
                          {errors?.[settingsGroup]?.[index]?.url.message}
                        </span>
                      )
                    }
                    __next40pxDefaultSize
                  />
                </div>
              )}
            />
          </PanelRow>
          <PanelRow>
            <Button
              variant="primary"
              isDestructive
              onClick={handleRemove}
              style={{ width: 'fit-content' }}>
              {__('Remove item', 'timbertail')}
            </Button>
          </PanelRow>
        </div>
      </PanelBody>
    </Panel>
  );
};

export default SocialMediaItem;
