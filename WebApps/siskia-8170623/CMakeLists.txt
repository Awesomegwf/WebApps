project(siskia)
cmake_minimum_required(VERSION 2.8.6)

set(CMAKE_CXX_STANDARD 11)
set(MAINPATH /media/kylin/workspace2/siskia)

set(SKIA /media/kylin/workspace2/siskia/skia)

set(SOUGOU /media/kylin/workspace2/siskia/sougou)

include_directories(
        ${MAINPATH}/include
        ${SKIA}/include
        ${SKIA}/include/android
        ${SKIA}/include/atlastext
        ${SKIA}/include/c
        ${SKIA}/include/codec
        ${SKIA}/include/config
        ${SKIA}/include/core
        ${SKIA}/include/effects
        ${SKIA}/include/encode
        ${SKIA}/include/gpu
        ${SKIA}/include/gpu/gl
        ${SKIA}/include/gpu/mock
        ${SKIA}/include/gpu/mtl
        ${SKIA}/include/gpu/vk
        ${SKIA}/include/pathops
        ${SKIA}/include/ports
        ${SKIA}/include/private
        ${SKIA}/include/svg
        ${SKIA}/include/utils
        ${SKIA}/include/utils/mac
        ${SKIA}/include/views
        ${SOUGOU}/include  
        )

set(SRCLIST  ./src/t_hdcSkia.cpp ./main.cpp ./src/t_penSkia.cpp ./src/t_imageSkia.cpp ./src/t_fontSkia.cpp ./src/t_wndTopSkia.cpp)
link_libraries(${SKIA}/libskia.so)
add_executable(sougou ${SRCLIST})
TARGET_LINK_LIBRARIES(sougou dl idn z)
TARGET_LINK_LIBRARIES(sougou  ${SOUGOU}/x86_64-linux-gnu/libcrypto.a ${SOUGOU}/x86_64-linux-gnu/libcurl.a ${SOUGOU}/x86_64-linux-gnu/sogoulib/libSGKeyboard.a)

