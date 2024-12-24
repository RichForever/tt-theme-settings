import { Controller, useFormContext } from "react-hook-form";

import { __ } from "@wordpress/i18n";
import {
  Button,
  Panel,
  PanelBody,
  PanelRow,
  TextControl,
} from "@wordpress/components";

const SocialMediaItem = ({ index, name, handleRemove, isNew }) => {
  const { control, watch } = useFormContext();
  const platform = watch(`${name}.${index}.platform`);
  const title = platform || __("New Social Media", "timbertail");

  return (
    <Panel>
      <PanelBody title={title} initialOpen={isNew}>
        <div style={{ marginTop: "16px" }}>
          <PanelRow>
            <Controller
              name={`${name}.${index}.platform`}
              control={control}
              render={({ field }) => (
                <div style={{ flex: 1 }}>
                  <TextControl
                    {...field}
                    label={__("Platform Name", "timbertail")}
                    __next40pxDefaultSize
                  />
                </div>
              )}
            />
          </PanelRow>
          <PanelRow>
            <Controller
              name={`${name}.${index}.url`}
              control={control}
              render={({ field }) => (
                <div style={{ flex: 1 }}>
                  <TextControl
                    {...field}
                    label={__("URL", "timbertail")}
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
              style={{ width: "fit-content" }}
            >
              {__("Remove item", "timbertail")}
            </Button>
          </PanelRow>
        </div>
      </PanelBody>
    </Panel>
  );
};

export default SocialMediaItem;
