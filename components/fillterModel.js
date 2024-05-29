import { Pressable, StyleSheet, Text, View } from 'react-native'
import React,{useMemo} from 'react'
import {
    BottomSheetModal,
    BottomSheetView,
 
  } from '@gorhom/bottom-sheet';
  import { BlurView } from 'expo-blur';
import Animated, { Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { filter } from 'lodash';
import { theme } from '../constants/theme';
import { capitalize, hp } from '../helpers/common';
import {SectionView,CommonFilterRow, ColorFilter} from './filterViews';
import { data } from '../constants/data';


const sections={
  "orders":(props)=><CommonFilterRow {...props}/>,
  "orientation":(props)=><CommonFilterRow {...props}/>,
  "type":(props)=><CommonFilterRow {...props}/>,
  "colors":(props)=><ColorFilter {...props}/>
}


const FillterModel = ({modelRef,onClose,onApply,onReset,setFilters,filters}) => {
    const snapPoints = useMemo(() => ['75%'], []);
   

    
  return (
    <BottomSheetModal
    ref={modelRef}
    index={0}
    snapPoints={snapPoints}
    enablePanDownToClose={true}
    backdropComponent={CustomBackDrop}
  >
    <BottomSheetView style={styles.contentContainer}>
      <View style={styles.content}>
            <Text style={styles.filterText}>Filter</Text>
         
              {
                Object.keys(sections).map((sectionName,index)=>{
                  let sectioView=sections[sectionName]
                  let title=capitalize(sectionName)
                  let sectionData=data.filters[sectionName]
                  return (
                    <Animated.View
                    entering={FadeInDown.delay((index*100)+100).springify().damping(11)} 
                    key={sectionName}>
                      <SectionView
                        title={title}
                        content={sectioView({
                          data:sectionData,
                          filters,
                          setFilters,
                          filterName:sectionName
                        })}
                      />
                    </Animated.View>
                  )
                })
              }
              {/* actions */}
               <Animated.View 
               style={styles.buttons}
               entering={FadeInDown.delay(500).springify().damping(11)} 
               >
                
                <Pressable style={[styles.applyButton]} onPress={onReset}>
                  <Text style={[styles.buttonText,{color:theme.colors.grayBG}]}>Reset</Text>
               </Pressable>
               <Pressable style={[styles.applyButton]} onPress={onApply}>
                  <Text style={[styles.buttonText,{color:theme.colors.white}]}>Apply</Text>
               </Pressable>
              </Animated.View> 
      </View>
    </BottomSheetView>
  </BottomSheetModal>
  )
}








const CustomBackDrop=({animatedIndex,style})=>{
    const containerAnimatedStyles=useAnimatedStyle(()=>{
        let opacity=interpolate(
            animatedIndex.value,
            [-1,0]
            ,[0,1]
            ,Extrapolation.CLAMP)

        return {
            opacity
        }
    })
    const containerStyle=[
        StyleSheet.absoluteFill,
        style,
        styles.overlay,
        containerAnimatedStyles
    ]

    return <Animated.View style={containerStyle}>
        {/* blur view */}
        <BlurView  
            style={StyleSheet.absoluteFill}
            tint='dark'
            intensity={25}
        >
        
      </BlurView>
    </Animated.View>
}

export default FillterModel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },

      overlay:{
        backgroundColor:'rgba(0,0,0,0,0.5)'
      },
      content:{
        flex:1,
     
        
        gap:15,
        paddingVertical:10,
        paddingHorizontal:20
      },
      filterText:{
        fontSize:hp(4),
        fontWeight:theme.fontWeights.semibold,
        color:theme.colors.neutral(0.8),
        marginBottom:5
      },
      buttons:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        gap:10
      },
      applyButton:{
        flex:1,
        backgroundColor:theme.colors.neutral(0.8),
        padding:12,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:theme.radius.md,
        borderCurve:'continuous'
      },

      resetButton:{
        flex:1,
        backgroundColor:theme.colors.neutral(0.03),
        padding:12,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:theme.radius.md,
        borderCurve:'continuous',
        borderWidth:'2',
        borderColor:theme.colors.grayBG
      },
      buttonText:{
        fontSize:hp(2.2)
      }
})