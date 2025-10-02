import { Platform, StyleSheet } from "react-native";

export const colors = {
  appBackground: '#F2F0EF',
  appPrimary: '#883CD5',
  appSecundary: '#797D88',
  textPrimary: '#32364C',
  textSecundary: '#797D88',
  textInvalid: '#d14',
  shadow: '#000'
}

export const fonts = {
  inter: {
    light: 'Inter_300Light',
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semibold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold'
  }
}

export const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  full: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    padding: 16,
    gap: 26
  },
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  keyboardAvoidingViewContainer: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.appBackground,
    padding: 16
  },
  layoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  layoutHeaderLogo: {
    width: 140,
    height: 60,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  layoutHeaderUserContainer: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  layoutHeaderUser: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  navLabel: {
    fontSize: 16,
    fontFamily: fonts.inter.medium,
    color: colors.textSecundary,
  },
  navFamilia: {
    fontSize: 36,
    fontFamily: fonts.inter.semibold,
    color: colors.textPrimary,
    letterSpacing: -2
  },
  menulist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8
  },
  menu: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 110
  },
  menuIconContainer: {
    width: 75,
    height: 75,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  menuIcon: {
    width: 50,
    height: 50,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  menuLabel: {
    fontSize: 14,
    fontFamily: fonts.inter.medium,
    color: colors.textSecundary,
    letterSpacing: 0
  },
  pagesTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 4
  },
  pagesTitleLabel: {
    fontSize: 24,
    fontFamily: fonts.inter.semibold,
    color: colors.textPrimary,
    letterSpacing: -1
  },
  pagesBadges: {
    flexDirection: 'row',
    gap: 8
  },
  pagesBadge: {
    width: 10,
    height: 10,
    borderRadius: 16,
  },
  pagesContainer: {
    flex: 1,
    gap: 16
  },
  pagesHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8
  },
  pagesActionButton: {
    fontSize: 28,
    color: colors.appSecundary,
    paddingTop: 12
  },
  headerLogo: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.20,
    shadowRadius: 2,
    elevation: 2,
  },
  headerUserContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "center",
  },
  headerUser: {
    objectFit: 'fill',
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: '#FFF',
  },
  headerUserInvalid: {
    objectFit: 'fill',
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: colors.textInvalid,
  },
  headerUserEditWrapper: {
    position: 'relative',
    alignItems: "center"
  },
  headerUserEditIconOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0008',
    borderRadius: 20,
    padding: 6,
  },
  headerContainer: {
    gap: 6,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: fonts.inter.medium,
    letterSpacing: -2
  },
  headerDescription: {
    fontSize: 20,
    fontFamily: fonts.inter.light,
    letterSpacing: -1
  },
  headerSection: {
    fontSize: 20,
    fontFamily: fonts.inter.regular,
    letterSpacing: -1,
    paddingTop: 12
  },
  submitButton: {
    backgroundColor: colors.appPrimary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  submitButtonLabel: {
    fontSize: 18,
    fontFamily: fonts.inter.semibold,
    color: "#FFF"
  },
  cancelButton: {
    paddingHorizontal: 16,
    height: 38,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelButtonLabel: {
    fontSize: 16,
    fontFamily: fonts.inter.semibold,
    color: colors.textSecundary
  },
  formControlContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 400,
    marginHorizontal: 'auto',
    gap: 16,
  },
  formControl: {
    gap: 4
  },
  formLabelHelpInvalid: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: fonts.inter.medium,
    color: colors.textInvalid
  },
  formLabelInvalid: {
    fontSize: 16,
    fontFamily: fonts.inter.semibold,
    color: colors.textInvalid
  },
  formLabel: {
    fontSize: 16,
    fontFamily: fonts.inter.light,
    color: colors.textPrimary
  },
  formInputInvalid: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: fonts.inter.regular,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: colors.textInvalid,
    borderRadius: 8
  },
  formInput: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: fonts.inter.regular,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#bec8cc",
    borderRadius: 8
  },
  formInputConfigWrapper: {
    paddingHorizontal: 10,
    paddingVertical: Platform.select({ ios: 8, android: 2 }),
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#bec8cc",
    borderStyle: "solid",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  formInputConfigValue: {
    fontSize: 16,
    fontFamily: fonts.inter.regular,
  },
  formInputWithActionWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderWidth: 1,
    backgroundColor: "#fcfcfc",
    borderColor: "#bec8cc",
    borderStyle: "dashed",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  formInputWithActionValue: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.inter.regular,
    flexWrap: 'wrap'
  },
  formInputDisabled: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: fonts.inter.regular,
    borderWidth: 1,
    backgroundColor: "#fcfcfc",
    borderColor: "#bec8cc",
    borderStyle: "dashed",
    borderRadius: 8,
    pointerEvents: "none",
    textAlign: "justify"
  },
  formInputPlaceholderInvalid: {
    color: colors.textInvalid,
    fontSize: 16,
    fontFamily: fonts.inter.regular,
  },
  formInputPlaceholder: {
    color: "#bbbbbb",
    fontSize: 16,
    fontFamily: fonts.inter.regular,
  },
  newAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4
  },
  newAccountLabel: {
    fontSize: 16,
    color: colors.textSecundary,
    fontFamily: fonts.inter.medium
  },
  newAccountLink: {
    fontSize: 16,
    color: colors.textSecundary,
    fontWeight: 'bold',
    fontFamily: fonts.inter.bold
  },
  containerActivityIndicator: {
    backgroundColor: colors.appBackground,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },
  addRegistroButtonContainer: {
    padding: 10,
    alignItems: "center"
  },
  addRegistroButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addRegistroButtonText: {
    fontSize: 16,
    fontFamily: fonts.inter.medium,
    color: colors.textSecundary,
  },
  listitem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10
  },
  listitemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  },
  listitemImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  listitemTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
    gap: 2,
    flex: 1
  },
  listitemHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  listitemTitulo: {
    fontSize: 18,
    fontFamily: fonts.inter.semibold,
    color: colors.textPrimary,
    letterSpacing: 0,
  },
  listitemDescricao: {
    fontSize: 14,
    fontFamily: fonts.inter.regular,
    color: colors.textPrimary,
    letterSpacing: 0
  },
  listitemBy: {
    fontSize: 14,
    fontFamily: fonts.inter.regular,
    color: colors.textPrimary,
    letterSpacing: 0,
    marginBottom: 6
  },
  listitemDescricaoLabel: {
    fontSize: 14,
    fontFamily: fonts.inter.semibold,
    color: colors.textPrimary,
    letterSpacing: 0,
    marginTop: 4
  },
  listitemDescricaoValue: {
    fontSize: 14,
    fontFamily: fonts.inter.regular,
    color: colors.textPrimary,
    letterSpacing: 0,
    marginTop: 4
  },
  listitemData: {
    fontSize: 14,
    fontFamily: fonts.inter.medium,
    color: colors.appSecundary,
    letterSpacing: 0
  },
  listitemCheckinContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  listitemCheckinButton: {
    width: 54,
    height: 54,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: colors.appBackground,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8
  }, modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  overlay: {
    backgroundColor: "#000000",
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  modalContent: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: colors.appBackground,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 20,
    gap: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalHeaderTitle: {
    fontSize: 24,
    fontFamily: fonts.inter.semibold,
    color: "#000"
  },
  listInfoContainer: {},
  listInfoWrapper: {
    borderColor: "#bec8cc",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 8,
    gap: 1
  },
  listInfoItem: {
    backgroundColor: "#fcfcfc",
    paddingVertical: 14,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  listInfoItemFirst: {
    borderTopWidth: 0,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  listInfoItemLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  listInfoItemLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.inter.regular,
  },
  listInfoItemAction: {
    justifyContent: "center",
    alignItems: "center"
  },
  listInfoItemActionLabel: {
    fontSize: 16,
    fontFamily: fonts.inter.medium,
    color: colors.textSecundary
  },
  listInfoItemMoreButtonWrapper: {
    padding: 10,
    alignItems: "center"
  },
  listInfoItemMoreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  listInfoItemMoreButtonLabel: {
    fontSize: 16,
    fontFamily: fonts.inter.medium,
    color: colors.textSecundary,
  },
  a: {
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#bec8cc",
    borderStyle: "dashed",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  checkinListData: {
    gap: 24
  },
  checkinListDataItem: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4
  },
  checkinTimeline: {
    width: 30,
    alignItems: "center",
  },
  checkinLineTop: {
    width: 2,
    height: 15,
    backgroundColor: "#ccc",
  },
  checkinLineBottom: {
    width: 2,
    flex: 1,
    backgroundColor: "#ccc",
  },
  checkinDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ccc",
    zIndex: 1,
  },
  checkinListEvento: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkinListEventoCard: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 16,
    flex: 1,
    borderWidth: 1,
    backgroundColor: "#fcfcfc",
    borderColor: "#bec8cc",
    borderStyle: "dashed",
    borderRadius: 8,
  },
  checkinListEventoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checkinListEventoAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 4,
    zIndex: 1,
  },
  checkinListEventoCardContent: {
    flex: 1,
  },
  checkinListEventoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  checkinListEventoTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  checkinListEventoTime: {
    fontSize: 14,
    color: "#777",
  },
  checkinListEventoSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  skeleton: {
    backgroundColor: "#828282",
    borderRadius: 8,
}
});