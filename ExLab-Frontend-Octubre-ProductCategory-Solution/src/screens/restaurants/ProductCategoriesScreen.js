/* eslint-disable react/prop-types */
// TODO exam: implement listing of product categories for a restaurant and creation and deletion buttons
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, FlatList, Pressable, View } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as GlobalStyles from '../../styles/GlobalStyles'
import { AuthorizationContext } from '../../context/AuthorizationContext'
import { showMessage } from 'react-native-flash-message'
import DeleteModal from '../../components/DeleteModal'
import { getCategoriesByRestaurant, remove } from '../../api/CategoriesEndpoints'

export default function ProductCategories({ navigation, route }) {
  const [categories, setCategories] = useState([])
  const [categoryToBeDeleted, setCategoryToBeDeleted] = useState(null)
  const { loggedInUser } = useContext(AuthorizationContext)

  useEffect(() => {
    if (loggedInUser) {
      fetchCategories()
    } else {
      setCategories(null)
    }
  }, [loggedInUser, route])



  const renderCategory = ({ item }) => {
    return (
      <View style={styles.categoryRow}>
        <TextRegular style={styles.categoryName}>{item.name}</TextRegular>
        <View style={styles.actionButtonsContainer}>
          <Pressable
            onPress={() => { setCategoryToBeDeleted(item) }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? GlobalStyles.brandPrimaryTap
                  : GlobalStyles.brandPrimary
              },
              styles.actionButton
            ]}>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
              <MaterialCommunityIcons name='delete' color={'white'} size={20} />
              <TextRegular textStyle={styles.text}>
                Delete
              </TextRegular>
            </View>
          </Pressable>
        </View>
      </View>
    )
  }

  const renderEmptyCategoriesList = () => {
    return (
      <TextRegular textStyle={styles.emptyList}>
        No categories were retrieved. Are you logged in?
      </TextRegular>
    )
  }

  const renderHeader = () => {
    return (
      <>
        {loggedInUser &&
          <Pressable
            onPress={() => navigation.navigate('CreateProductCategoryScreen', { id: route.params.id })
            }
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? GlobalStyles.brandGreenTap
                  : GlobalStyles.brandGreen
              },
              styles.button
            ]}>
            <View style={[{ flex: 1, flexDirection: 'row', justifyContent: 'center' }]}>
              <MaterialCommunityIcons name='plus-circle' color={'white'} size={20} />
              <TextRegular textStyle={styles.text}>
                Create product category
              </TextRegular>
            </View>
          </Pressable>
        }
      </>
    )
  }
  const fetchCategories = async () => {
    try {
      const fetchedProductCategories = await getCategoriesByRestaurant(route.params.id)
      setCategories(fetchedProductCategories)
    } catch (error) {
      showMessage({
        message: `There was an error while retrieving product categories. ${error} `,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  const removeProductCategory = async (category) => {
    try {
      await remove(category.restaurantId, category.id)
      await fetchCategories()
      setCategoryToBeDeleted(null)
      showMessage({
        message: `Product category ${category.name} succesfully removed`,
        type: 'success',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    } catch (error) {
      console.log(error)
      setCategoryToBeDeleted(null)
      showMessage({
        message: `Category ${category.name} could not be removed.`,
        type: 'error',
        style: GlobalStyles.flashStyle,
        titleStyle: GlobalStyles.flashTextStyle
      })
    }
  }

  return (
    <>
      <FlatList
        style={styles.container}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyCategoriesList}
      />
      <DeleteModal
        isVisible={categoryToBeDeleted !== null}
        onCancel={() => setCategoryToBeDeleted(null)}
        onConfirm={() => removeProductCategory(categoryToBeDeleted)}>
        <TextRegular>If the category has products, it cannot be deleted.</TextRegular>
      </DeleteModal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignContent: 'center', padding: 10
  },
  categoryName: {
    textAlign: 'center',
    flex: 1,
  },
  categoryRow: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 5,
    paddingHorizontal: 10,

    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1
  },
  button: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    flex: 1,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    bottom: 5,
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  }
})

// TODO exam: END