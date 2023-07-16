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

export function applyEffects(collectionView: CollectionView) {
  (<any>collectionView).collectionViewWillDisplayCellForItemAtIndexPath =
    function (
      collectionView: UICollectionView,
      cell: UICollectionViewCell,
      indexPath: NSIndexPath
    ) {
      if (cell && indexPath) {
        if (this.reverseLayout) {
          cell.transform = CGAffineTransformMakeRotation(-Math.PI);
        }
        if (this.items) {
          const rowNumber = indexPath.row;

          if (!this.lastVisibleItem) {
            this.lastVisibleItem =
              collectionView.indexPathsForVisibleItems?.lastObject;
          }

          if (!this.animatedRows) {
            this.animatedRows = {};
          }

          const lastVisibleRow = this.lastVisibleItem?.row;
          if (!this.animatedRows[indexPath.row]) {
            if (rowNumber >= lastVisibleRow) {
              this.animatedRows[rowNumber] = true;
              let delay = rowNumber > 12 ? 0.05 : rowNumber * 0.05;

              cell.alpha = 0.0;
              cell.transform = CGAffineTransformMakeScale(0.5, 0.7); //.translatedBy(x: 0, y: 50)

              UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(
                0.3,
                delay,
                0.8,
                0.8,
                UIViewAnimationOptions.CurveEaseOut,
                () => {
                  cell.alpha = 1.0;
                  cell.transform = CGAffineTransformIdentity;
                },
                () => {}
              );
            }
          }

          // console.log('rowNumber:', rowNumber);
          // console.log('this.items.length:', this.items.length);
          const loadMoreItemIndex = this.items.length - this.loadMoreThreshold;
          if (
            indexPath.row === loadMoreItemIndex &&
            this.hasListeners(CollectionView.loadMoreItemsEvent)
          ) {
            this.notify({
              eventName: CollectionView.loadMoreItemsEvent,
              object: this,
            });
          }
        }

        if (cell.preservesSuperviewLayoutMargins) {
          cell.preservesSuperviewLayoutMargins = false;
        }

        if (cell.layoutMargins) {
          cell.layoutMargins = UIEdgeInsetsZero;
        }
      }
    };
}
