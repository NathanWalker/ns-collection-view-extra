import { Dialogs } from "@nativescript/core";
import { CollectionView } from "@nstudio/ui-collectionview";

export function createLayout(collectionView: CollectionView) {
  const config = UICollectionLayoutListConfiguration.alloc().initWithAppearance(
    UICollectionLayoutListAppearance.Plain
  );
  config.showsSeparators = true;

  config.trailingSwipeActionsConfigurationProvider = (p1: NSIndexPath) => {
    const moreAction = UIContextualAction.contextualActionWithStyleTitleHandler(
      UIContextualActionStyle.Normal,
      "More",
      (
        action: UIContextualAction,
        sourceView: UIView,
        actionPerformed: (p1: boolean) => void
      ) => {
        console.log("more actionPerformed!");
        actionPerformed(true);
        Dialogs.action("✨", "Cancel", [
          "Take",
          "NativeScript",
          "To",
          "The",
          "🌝 Moon 🌝",
        ]).then((value) => {
          if (value !== "Cancel") {
            Dialogs.alert({
              title: "🚀🚀🚀",
              message: `💨💨💨💨💨💨💨`,
              okButtonText: "Blast Off!",
            }).then(() => {});
          }
        });
      }
    );
    moreAction.backgroundColor = UIColor.systemGray4Color;
    moreAction.image = UIImage.systemImageNamed("ellipsis.circle.fill");
    const flagAction = UIContextualAction.contextualActionWithStyleTitleHandler(
      UIContextualActionStyle.Normal,
      "Flag",
      (
        action: UIContextualAction,
        sourceView: UIView,
        actionPerformed: (p1: boolean) => void
      ) => {
        console.log("flag actionPerformed!");
        actionPerformed(true);
      }
    );
    flagAction.backgroundColor = UIColor.systemOrangeColor;
    flagAction.image = UIImage.systemImageNamed("flag.fill");
    const archiveAction =
      UIContextualAction.contextualActionWithStyleTitleHandler(
        UIContextualActionStyle.Normal,
        "Archive",
        (
          action: UIContextualAction,
          sourceView: UIView,
          actionPerformed: (p1: boolean) => void
        ) => {
          console.log("archive actionPerformed!");
          actionPerformed(true);
        }
      );
    archiveAction.backgroundColor = UIColor.systemPurpleColor;
    archiveAction.image = UIImage.systemImageNamed("archivebox.fill");

    return UISwipeActionsConfiguration.configurationWithActions([
      archiveAction,
      flagAction,
      moreAction,
    ]);
  };

  config.leadingSwipeActionsConfigurationProvider = (p1: NSIndexPath) => {
    const readAction = UIContextualAction.contextualActionWithStyleTitleHandler(
      UIContextualActionStyle.Normal,
      "Read",
      (
        action: UIContextualAction,
        sourceView: UIView,
        actionPerformed: (p1: boolean) => void
      ) => {
        console.log("read actionPerformed!");
        actionPerformed(true);
      }
    );
    readAction.backgroundColor = UIColor.systemBlueColor;
    readAction.image = UIImage.systemImageNamed("envelope.badge.fill");

    const remindMeAction =
      UIContextualAction.contextualActionWithStyleTitleHandler(
        UIContextualActionStyle.Normal,
        "Remind Me",
        (
          action: UIContextualAction,
          sourceView: UIView,
          actionPerformed: (p1: boolean) => void
        ) => {
          console.log("remind me actionPerformed!");
          actionPerformed(true);
        }
      );
    remindMeAction.backgroundColor = UIColor.systemPurpleColor;
    remindMeAction.image = UIImage.systemImageNamed("clock.fill");
    return UISwipeActionsConfiguration.configurationWithActions([
      readAction,
      remindMeAction,
    ]);
  };

  return UICollectionViewCompositionalLayout.layoutWithListConfiguration(
    config
  );
}
