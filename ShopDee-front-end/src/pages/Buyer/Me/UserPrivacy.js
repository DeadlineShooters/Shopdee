import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, TextInput, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from "react";
import { COLORS } from "./Themes";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import { Dropdown } from "react-native-element-dropdown";

const UserPrivacy = ({ navigation }) => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white,
      paddingHorizontal: 22,
    }}>
        <View style={{
            marginVertical: 36,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                style={{
                    position: "absolute",
                    left: -10,
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={24}
                    color={COLORS.lightBlue}
                />
                <Text style={{color: COLORS.lightBlue}}>Profile</Text>
            </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>User Privacy</Text>
      </View>
      <ScrollView>
            <View style={{
                flexDirection: "column",
                marginBottom: 6,
            }}>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Privacy Policy</Text>
                <View style={{
                    height: 220,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}> {'\t'}{'\t'}{'\t'}{'\t'}Last updated: November 21, 2023. {"\n"}
                        {'\t'}{'\t'}{'\t'}{'\t'}This Privacy Policy describes Our policies and procedures on the collection,
                        use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
                        We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information
                        in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.</Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Interpretation and Definitions</Text>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Interpretation</Text>
                <View style={{
                    height: 110,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}> {'\t'}{'\t'}{'\t'}{'\t'}The words of which the initial letter is capitalized have meanings 
                    defined under the following conditions. The following definitions shall have the same meaning
                    regardless of whether they appear in singular or in plural.</Text>
                </View>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Definitions</Text>
                <View style={{
                    height: 740,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}> For the purposes of this Privacy Policy: {"\n"}

                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Account means a unique account created for You to access our Service or parts of our Service. {"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Affiliate means an entity that controls, is controlled by or is under common control with a party, 
                    where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Application refers to ShopDee, the software program provided by the Papaya.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Papaya (referred to as either "the Papaya", "We", "Us" or "Our" in this Agreement) refers to ShopDee.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Country refers to: Vietnam.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Personal Data is any information that relates to an identified or identifiable individual.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Service refers to the Application.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Service Provider means any natural or legal person who processes the data on behalf of the Papaya. It refers to third-party companies or individuals employed
                    by the Papaya to facilitate the Service, to provide the Service on behalf of the Papaya, to perform services related to the Service or to assist the Papaya in analyzing how the Service is used.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Third-party Social Media Service refers to any website or any social network website through which a User can log in or create an account to use the Service.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Usage Data refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}You means the individual accessing or using the Service, or the Papaya, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Collecting and Using Your Personal Data</Text>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Types of Data Collected</Text>
                <Text style={{
                fontSize: 14, fontWeight: "bold"
                }}>Personal Data</Text>
                <View style={{
                    height: 220,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}For the purposes of this Privacy Policy: {"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable
                    information may include, but is not limited to:{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Email address.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}First name and last name.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Phone number.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Address, State, Province, ZIP/Postal code, City.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Usage Data.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 14, fontWeight: "bold"
                }}>Usage Data</Text>
                <View style={{
                    height: 310,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}Usage Data is collected automatically when using the Service.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}Usage Data may include information such as Your Device's Internet Protocol
                    address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, 
                    the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}When You access the Service by or through a mobile device, We may collect certain information automatically,
                    including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, 
                    Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.{"\n"}
                    We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a 
                    mobile device.
                    </Text>
                </View>
                <Text style={{
                fontSize: 14, fontWeight: "bold"
                }}>Information from Third-Party Social Media Services</Text>
                <View style={{
                    height: 420,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}The Papaya allows You to create an account and log in to use the Service through the following Third-party Social Media Services:{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Google.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Facebook.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Instagram.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Twitter.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}LinkedIn.{"\n"}
                    {'\t'}{'\t'}{'\t'}If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may
                    collect Personal data that is already associated with Your Third-Party Social Media Service's account, such as Your name, Your email address,
                    Your activities or Your contact list associated with that account.{"\n"}
                    {'\t'}{'\t'}{'\t'}You may also have the option of sharing additional information with the Papaya through Your Third-Party Social Media
                    Service's account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Papaya 
                    permission to use, share, and store it in a manner consistent with this Privacy Policy.
                    </Text>
                </View>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Information Collected while Using Application</Text>
                <View style={{
                    height: 230,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}While using Our Application, in order to provide features of Our Application, We may collect, with Your prior permission:{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}{'\t'}Information regarding your location.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}We use this information to provide features of Our Service, to improve and customize Our Service. The information may be uploaded 
                    to the Papaya's servers and/or a Service Provider's server or it may be simply stored on Your device.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}You can enable or disable access to this information at any time, through Your Device settings.
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Use of Your Personal Data</Text>
                <View style={{
                    height: 1360,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}The Papaya may use Personal Data for the following purposes:{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}To provide and maintain our Service, including to monitor the usage of our Service.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}To manage Your Account: to manage Your registration as a user of the Service. The Personal Data
                    You provide can give You access to different functionalities of the Service that are available to You as a registered user.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}For the performance of a contract: the development, compliance and undertaking of the purchase
                    contract for the products, items or services You have purchased or of any other contract with Us through the Service.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}To contact You: To contact You by email, telephone calls, SMS, or other equivalent forms of electronic
                    communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, 
                    including the security updates, when necessary or reasonable for their implementation.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}To provide You with news, special offers and general information about other goods, services and events which we
                    offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}To manage Your requests: To attend and manage Your requests to Us.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, 
                    reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, 
                    in which Personal Data held by Us about our Service users is among the assets transferred.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends,
                    determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}We may share Your personal information in the following situations:{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Papaya assets, financing, 
                    or acquisition of all or a portion of Our business to another Papaya.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}With Affiliates: We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our 
                    parent Papaya and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}With business partners: We may share Your information with Our business partners to offer You certain products, services or promotions.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}With other users: when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may 
                    be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of 
                    Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}With Your consent: We may disclose Your personal information for any other purpose with Your consent.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Retention of Your Personal Data</Text>
                <View style={{
                    height: 280,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}The Papaya will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will
                    retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws),
                    resolve disputes, and enforce our legal agreements and policies.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}The Papaya will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data
                    is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Transfer of Your Personal Data</Text>
                <View style={{
                    height: 380,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}Your information, including Personal Data, is processed at the Papaya's operating offices and in any other places where the parties involved in the processing
                    are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where
                    the data protection laws may differ than those from Your jurisdiction.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}The Papaya will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your
                    Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Disclosure of Your Personal Data</Text>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Business Transactions</Text>
                <View style={{
                    height: 120,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}If the Papaya is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data
                    is transferred and becomes subject to a different Privacy Policy.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Law enforcement</Text>
                <View style={{
                    height: 120,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}Under certain circumstances, the Papaya may be required to disclose Your Personal Data if required to 
                    do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Other legal requirements</Text>
                <View style={{
                    height: 220,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}The Papaya may disclose Your Personal Data in the good faith belief that such action is necessary to:{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Comply with a legal obligation.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Protect and defend the rights or property of the Papaya.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Prevent or investigate possible wrongdoing in connection with the Service.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Protect the personal safety of Users of the Service or the public.{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}Protect against legal liability.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Security of Your Personal Data</Text>
                <View style={{
                    height: 160,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}The security of Your Personal Data is important to Us, but remember that no method 
                    of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially
                    acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.{"\n"}
                    </Text>
                </View>
                <Text style={{
                fontSize: 16, fontWeight: "bold"
                }}>Children's Privacy</Text>
                <View style={{
                    height: 300,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable 
                    information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data,
                    please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent,
                    We take steps to remove that information from Our servers.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Links to Other Websites</Text>
                <View style={{
                    height: 160,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}Our Service may contain links to other websites that are not operated by Us. 
                    If You click on a third party link, You will be directed to that third party's site. We strongly advise 
                    You to review the Privacy Policy of every site You visit.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Changes to this Privacy Policy</Text>
                <View style={{
                    height: 210,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.{"\n"}
                    {'\t'}{'\t'}{'\t'}{'\t'}You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </Text>
                </View>
                <Text style={{
                fontSize: 18, fontWeight: "bold"
                }}>Contact Us</Text>
                <View style={{
                    height: 80,
                    width: "100%",
                    borderColor: COLORS.secondaryGray,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginVertical: 6,
                    justifyContent: "center",
                    paddingLeft: 8
                }}>
                    <Text style={{
                        textAlign: "justify",
                        margin: 10,
                    }}>{'\t'}{'\t'}{'\t'}{'\t'}If you have any questions about this Privacy Policy, You can contact us:{"\n"}
                    <MaterialIcons name="circle" size={8} color="black" />{'\t'}{'\t'}{'\t'}By email: contactshopdee@gmail.com{"\n"}
                    </Text>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

export default UserPrivacy