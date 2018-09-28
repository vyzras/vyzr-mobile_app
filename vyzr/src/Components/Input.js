import React from 'react';
import { TextInput, Image, View, Text, Platform } from 'react-native';

const Input = (props) => {
  const {
    input,
    placeholder,
    onChangeText,
    customInputStyle,
    blurOnSubmit,
    imageName,
    customImageStyle,
    showImage,
    imageSize,
    customContainerStyle,
    meta,
    secureTextEntry,
    keyboardType,
    maxLength,
    placeholderTextColor,
    returnKeyType,
    onSubmitEditing,
    editable,
    selectTextOnFocus,
    value,
    multiline,
    numberOfLines,
    erroTextColor
  } = props;
  const { inputStyle, imageStyle, containerStyle, errorContainerStyle } = styles;
  return (
    <View style={{}}>
      <View style={[containerStyle, customContainerStyle]}>
        {showImage === true ?
          <Image style={[imageStyle, customImageStyle]} source={imageName} width={imageSize} height={imageSize}></Image> : null
        }
        <TextInput
          style={[inputStyle, customInputStyle]}
          placeholder={placeholder}
          underlineColorAndroid='transparent'
          placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#fff'}
          keyboardType={keyboardType}
          blurOnSubmit={blurOnSubmit}
          maxLength={maxLength}
          multiline={multiline ? multiline : false}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          numberOfLines = {numberOfLines}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          editable={editable}
          selectTextOnFocus={selectTextOnFocus}
          value={value}
          {...input}
        />
      </View>
      <View style={errorContainerStyle}>{
        renderErrors(meta, erroTextColor)}
      </View>
    </View>
  );
};

const renderErrors = (meta, erroTextColor) => {
  const { errorTextStyle } = styles;
  if (meta.touched && meta.error) {
    return (
      <Text style={[errorTextStyle, { color: (erroTextColor ? erroTextColor : "#fff") }]}>{meta.error}</Text>
    );
  }
};

const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 18,
    height: 44,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderColor: '#fff'
  },
  inputStyle: {
    fontSize: 14,
    paddingHorizontal: 15,
    flex: 1,
    position: 'relative',
    top: 0,
    textAlign: "left",
    color: "#fff",
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Avenir-Medium'
  },

  errorContainerStyle: {
    // flex: 1,
  },
  errorTextStyle: {
    position: 'absolute',
    top: -8,
    right: 20,
    textAlign: 'right',
    color: '#fff',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Medium' : 'Avenir-Medium'
  },
  imageStyle: {
    top: 14,
    marginLeft: 5
  }
};

export { Input };