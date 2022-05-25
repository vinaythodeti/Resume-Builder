import { ModuleWithProviders, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BlockUIModule} from 'primeng/blockui';
import {ButtonModule,ButtonDirective} from 'primeng/button';
import {BadgeModule,BadgeDirective} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {CalendarModule} from 'primeng/calendar';
import {CaptchaModule} from 'primeng/captcha';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipsModule} from 'primeng/chips';
import {ChipModule} from 'primeng/chip';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DomHandler} from 'primeng/dom';
import {DragDropModule} from 'primeng/dragdrop';
import {DropdownModule} from 'primeng/dropdown';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {DataViewModule} from 'primeng/dataview';
import {FieldsetModule} from 'primeng/fieldset';
import {FocusTrapModule} from 'primeng/focustrap';
import {GalleriaModule} from 'primeng/galleria';
import {GMapModule} from 'primeng/gmap';
import {InplaceModule} from 'primeng/inplace';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KeyFilterModule} from 'primeng/keyfilter';
import {KnobModule} from 'primeng/knob';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TableModule} from 'primeng/table';
import {TabMenuModule} from 'primeng/tabmenu';
import {TabViewModule} from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {TooltipModule} from 'primeng/tooltip';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TreeModule} from 'primeng/tree';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {TreeTableModule} from 'primeng/treetable';
import {TimelineModule} from 'primeng/timeline';
import {TerminalModule} from 'primeng/terminal';
import {TagModule} from 'primeng/tag';
import {ObjectUtils} from 'primeng/utils';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import { CardsModule } from 'angular-bootstrap-md';
import {CardModule} from 'primeng/card';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { SplitButtonModule} from 'primeng/splitbutton';
import {NgxPrintModule} from 'ngx-print';

const PRIMENG_MODULES = [
 AccordionModule,
 BsDatepickerModule,
 AutoCompleteModule,
 AvatarModule,
 AvatarGroupModule,
 BadgeModule,
 BlockUIModule,
 ButtonModule,
 BreadcrumbModule,
 CalendarModule,
 CaptchaModule,
 CheckboxModule,
 ChipModule,
 ChipsModule,
 CodeHighlighterModule,
 ConfirmDialogModule,
 ConfirmPopupModule,
 ContextMenuModule,
 DialogModule,
 DragDropModule,
 DropdownModule,
 DynamicDialogModule,
 DataViewModule,
 FieldsetModule,
 FocusTrapModule,
 GalleriaModule,
 GMapModule,
 InplaceModule,
 InputMaskModule,
 InputNumberModule,
 InputSwitchModule,
 InputTextModule,
 InputTextareaModule,
 KeyFilterModule,
 KnobModule,
 LightboxModule,
 ListboxModule,
 MegaMenuModule,
 MenuModule,
 MenubarModule,
 MessagesModule,
 MultiSelectModule,
 OrderListModule,
 OrganizationChartModule,
 OverlayPanelModule,
 PaginatorModule,
 PanelMenuModule,
 PanelModule,
 PasswordModule,
 ProgressBarModule,
 ProgressSpinnerModule,
 PickListModule,
 RadioButtonModule,
 ScrollPanelModule,
 ScrollTopModule,
 SelectButtonModule,
 SidebarModule,
 SkeletonModule,
 SliderModule,
 StepsModule,
 SplitterModule,
 SplitButtonModule,
 SpinnerModule,
 SlideMenuModule,
 SplitterModule,
 TabMenuModule,
 TabViewModule,
 TableModule,
 TagModule,
 TieredMenuModule,
 TreeModule,
 TreeModule,
 TriStateCheckboxModule,
 ToastModule,
 ToggleButtonModule,
 TooltipModule,
 TimelineModule,
 TerminalModule,
 TreeTableModule,
 VirtualScrollerModule,
 ChartModule,
 CardModule,
 NgxPrintModule
];

@NgModule({
  imports: [CommonModule, ...PRIMENG_MODULES],
  exports: [CommonModule,  ...PRIMENG_MODULES],
  declarations: [],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
      ]
    };
  }
}
